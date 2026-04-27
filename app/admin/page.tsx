'use client'

import { useState } from 'react'
import { ShieldCheck, KeyRound } from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { Badge } from '@/modules/shared/components/badge'
import { useCampaign } from '@/modules/campaign/use-campaign'
import { OFFLINE_CAMPAIGN } from '@/modules/campaign/offline-fallback'
import { DEFAULT_CAMPAIGN_SLUG } from '@/modules/shared/lib/graphql-client'
import { useRenownAuth } from '@/modules/operations/use-renown-auth'
import {
  callCancelPledge,
  callMarkConfirmed,
  callResolveDependency,
  type OperationResult,
} from '@/modules/operations/admin-actions'
import { PledgeStatusBadge, DependencyStatusBadge } from '@/modules/campaign/components/status-badge'
import { formatEthAmount } from '@/modules/shared/lib/format'

export default function AdminPage() {
  const status = useRenownAuth()
  const { data: campaign } = useCampaign(DEFAULT_CAMPAIGN_SLUG, {
    initialData: OFFLINE_CAMPAIGN,
    pollMs: 10_000,
  })
  const c = campaign ?? OFFLINE_CAMPAIGN

  const [results, setResults] = useState<Record<string, OperationResult>>({})
  const [busyKey, setBusyKey] = useState<string | null>(null)

  // Token provider — when reactor-browser is unavailable we just return null
  // so the request fails gracefully (server returns 401, surfaced to user).
  const getToken = async (): Promise<string | null> => {
    if (status.kind !== 'ready') return null
    try {
      // @ts-expect-error - optional peer dep; only present when this app is mounted from the cloud bundle
      const mod = (await import('@powerhousedao/reactor-browser').catch(
        () => null,
      )) as null | {
        getRenown?: () => { getBearerToken?: (o: { expiresIn: number }) => Promise<string | null> }
      }
      const r = mod?.getRenown?.()
      if (!r?.getBearerToken) return null
      return await r.getBearerToken({ expiresIn: 600 })
    } catch {
      return null
    }
  }

  const run = async (key: string, fn: () => Promise<OperationResult>) => {
    setBusyKey(key)
    try {
      const r = await fn()
      setResults((prev) => ({ ...prev, [key]: r }))
    } catch (err) {
      setResults((prev) => ({
        ...prev,
        [key]: { success: false, error: String(err) },
      }))
    } finally {
      setBusyKey(null)
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
      <Card>
        <CardHeader
          title="Operator console"
          description="Authenticated mutation surface. Sign in with the campaign's authorized operator wallet via Connect, then dispatch admin actions."
          right={
            status.kind === 'ready' ? (
              <Badge tone="success">
                <ShieldCheck className="size-3" /> Renown ready
              </Badge>
            ) : status.kind === 'loading' ? (
              <Badge tone="neutral">Loading…</Badge>
            ) : (
              <Badge tone="warning">
                <KeyRound className="size-3" /> Auth bridge offline
              </Badge>
            )
          }
        />
        <CardBody>
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-[--color-ink-soft]">
                Campaign
              </div>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-[--color-ink-soft]">{c.slug}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[--color-ink-soft]">
                Treasury address
              </div>
              <code className="text-xs text-[--color-ink-muted]">
                {c.contributionAddresses[0]?.address ?? 'Not yet published'}
              </code>
            </div>
          </div>
          {status.kind === 'unavailable' ? (
            <div className="mt-4 rounded-lg border border-[--color-border] bg-[--color-warning-soft] p-3 text-xs text-[--color-warning]">
              {status.reason} — mutations from this app surface will return 401
              until the cloud bundle is mounted. The wiring (queries, signatures,
              Renown bearer flow) is in place under <code>modules/operations</code>.
            </div>
          ) : null}
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Pledges"
          description="Mark confirmed once funds land or the contributor signs the commitment. Cancel only if the originating org explicitly withdraws."
        />
        <ul className="divide-y divide-[--color-border-soft]">
          {c.contributorsPublic.map((p, i) => {
            const pledgeKey = `pledge-${i}`
            const confirmKey = `confirm-${pledgeKey}`
            const cancelKey = `cancel-${pledgeKey}`
            return (
              <li
                key={pledgeKey}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
              >
                <div>
                  <div className="text-sm font-medium">{p.contributorDisplayName}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <PledgeStatusBadge status={p.status} />
                    <span className="text-xs tabular-nums text-[--color-ink-soft]">
                      {formatEthAmount(p.pledgedAmount)} {p.assetSymbol}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ResultMessage result={results[confirmKey]} />
                  <ResultMessage result={results[cancelKey]} />
                  <button
                    onClick={() =>
                      run(confirmKey, () =>
                        callMarkConfirmed(getToken, {
                          campaignSlug: c.slug,
                          pledgeId: pledgeKey,
                        }),
                      )
                    }
                    disabled={busyKey === confirmKey}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: 'var(--color-success)' }}
                  >
                    {busyKey === confirmKey ? 'Marking…' : 'Mark confirmed'}
                  </button>
                  <button
                    onClick={() =>
                      run(cancelKey, () =>
                        callCancelPledge(getToken, {
                          campaignSlug: c.slug,
                          pledgeId: pledgeKey,
                          reason: 'cancelled from admin console',
                        }),
                      )
                    }
                    disabled={busyKey === cancelKey}
                    className="rounded-lg border border-[--color-border] bg-[--color-surface] px-3 py-1.5 text-xs font-medium text-[--color-ink-muted] transition-colors hover:border-[--color-danger-border] hover:text-[--color-danger] disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </Card>

      <Card>
        <CardHeader
          title="Dependencies"
          description="Resolve a dependency once its underlying governance vote, council action, or on-chain transaction has cleared."
        />
        <ul className="divide-y divide-[--color-border-soft]">
          {c.dependenciesPublic.map((d, i) => {
            const depKey = `dep-${i}`
            return (
              <li
                key={depKey}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
              >
                <div>
                  <div className="text-sm font-medium">{d.title}</div>
                  <div className="mt-1">
                    <DependencyStatusBadge status={d.status} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ResultMessage result={results[depKey]} />
                  <button
                    onClick={() =>
                      run(depKey, () =>
                        callResolveDependency(getToken, {
                          campaignSlug: c.slug,
                          dependencyId: depKey,
                        }),
                      )
                    }
                    disabled={busyKey === depKey || d.status === 'RESOLVED'}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: 'var(--color-brand)' }}
                  >
                    {busyKey === depKey ? 'Resolving…' : 'Resolve'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}

function ResultMessage({ result }: { result?: OperationResult }) {
  if (!result) return null
  if (result.success)
    return <span className="text-xs text-[--color-success]">ok</span>
  return (
    <span className="text-xs text-[--color-warning]" title={result.error ?? ''}>
      {result.error ? truncate(result.error, 30) : 'failed'}
    </span>
  )
}

function truncate(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s
}
