'use client'

import { useCampaign } from '@/modules/campaign/use-campaign'
import type { CampaignDetail } from '@/modules/campaign/queries'
import { Thermometer } from './thermometer'
import { CampaignStatusBadge } from './status-badge'
import { Card } from '@/modules/shared/components/card'
import { formatDateTime } from '@/modules/shared/lib/format'
import { CircleDot } from 'lucide-react'

export function CampaignHero({
  slug,
  initial,
}: {
  slug: string
  initial: CampaignDetail
}) {
  const { data, isFetching } = useCampaign(slug, { initialData: initial })
  const c = data ?? initial

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 gap-8 px-8 py-10 lg:grid-cols-[1fr_minmax(0,420px)]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs text-[--color-ink-soft]">
            <CampaignStatusBadge status={c.status} />
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <CircleDot
                className={`size-3 ${isFetching ? 'animate-pulse text-[--color-brand]' : 'text-[--color-success]'}`}
              />
              live · refreshed every 5s
            </span>
            {c.lastUpdateAt ? (
              <>
                <span>·</span>
                <span>last activity {formatDateTime(c.lastUpdateAt)}</span>
              </>
            ) : null}
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {c.name}
            </h1>
            {c.summary ? (
              <p className="mt-3 max-w-2xl text-base text-[--color-ink-muted]">
                {c.summary}
              </p>
            ) : null}
          </div>
          <Thermometer
            totalPledged={c.totalPledged}
            totalReceived={c.totalReceived}
            targetAmount={c.targetAmount}
            lastUpdateAt={c.lastUpdateAt}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 self-end">
          <Stat label="Pledges" value={String(c.pledgeCount)} />
          <Stat
            label="Asset"
            value={c.affectedAsset?.symbol ?? '—'}
            sub={c.affectedAsset ? `chain ${c.affectedAsset.chainId}` : undefined}
          />
          <Stat
            label="Dependencies cleared"
            value={`${c.dependenciesResolved}`}
            sub={`of ${c.dependenciesResolved + c.dependenciesBlocking}`}
          />
          <Stat label="Status" value={c.status.toLowerCase()} />
        </div>
      </div>
    </Card>
  )
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="rounded-xl border border-[--color-border] bg-[--color-bg]/40 px-4 py-3">
      <div className="text-xs uppercase tracking-wider text-[--color-ink-soft]">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold capitalize tabular-nums">{value}</div>
      {sub ? <div className="text-xs text-[--color-ink-soft]">{sub}</div> : null}
    </div>
  )
}
