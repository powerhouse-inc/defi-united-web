import Link from 'next/link'
import { fetchCampaigns } from '@/modules/campaign/queries'
import { OFFLINE_CAMPAIGN } from '@/modules/campaign/offline-fallback'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { Badge } from '@/modules/shared/components/badge'
import { formatEthAmount } from '@/modules/shared/lib/format'
import { ArrowRight, Plus, Radio } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CampaignsIndexPage() {
  let campaigns
  try {
    const all = await fetchCampaigns()
    // Hide leftover cloned campaigns from drive-clone demos so the index only
    // surfaces canonical campaigns.
    campaigns = all.filter((c) => !c.slug.endsWith('-clone'))
  } catch {
    campaigns = [
      {
        slug: OFFLINE_CAMPAIGN.slug,
        name: OFFLINE_CAMPAIGN.name,
        summary: OFFLINE_CAMPAIGN.summary,
        status: OFFLINE_CAMPAIGN.status,
        targetAmount: OFFLINE_CAMPAIGN.targetAmount,
        totalPledged: OFFLINE_CAMPAIGN.totalPledged,
        totalReceived: OFFLINE_CAMPAIGN.totalReceived,
        percentReceived: OFFLINE_CAMPAIGN.percentReceived,
        lastUpdateAt: OFFLINE_CAMPAIGN.lastUpdateAt,
      },
    ]
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Page header */}
      <div className="mb-12 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-[--color-brand-border] bg-[--color-brand-soft] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[--color-brand]">
          <Radio className="size-3" />
          DeFi United Coalition
        </span>
        <h1
          className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          <span className="gradient-text">Coordinated relief campaigns</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[--color-ink-muted]">
          DeFi United is a coalition that coordinates industry-wide responses
          to DeFi incidents. Each campaign is a public, verifiable group of
          protocols, foundations, and individuals — pooling pledges and
          tracking governance dependencies until users are made whole.
        </p>
      </div>

      {/* Active campaigns */}
      <div className="mb-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[--color-ink-soft]">
            Active campaigns
          </h2>
          <span className="font-mono text-xs text-[--color-ink-soft]">
            {campaigns.length} of {campaigns.length}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {campaigns.map((c, i) => {
            const target = Number(c.targetAmount ?? 0) || 1
            const pledged = Number(c.totalPledged) || 0
            const received = Number(c.totalReceived) || 0
            const pledgedPct = Math.min((pledged / target) * 100, 100)
            const receivedPct = Math.min((received / target) * 100, 100)
            return (
              <Link
                key={c.slug}
                href={`/campaigns/${c.slug}`}
                className="group block"
              >
                <Card className="h-full transition-shadow group-hover:shadow-[0_20px_60px_-12px_rgba(142,92,255,0.18)]">
                  <CardBody className="p-6 sm:p-7">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[--color-ink-soft]">
                          #{String(i + 1).padStart(3, '0')}
                        </span>
                        <Badge tone={c.status === 'ACTIVE' ? 'brand' : 'neutral'}>
                          {c.status}
                        </Badge>
                      </div>
                      <ArrowRight className="size-4 text-[--color-ink-soft] transition-transform group-hover:translate-x-1 group-hover:text-[--color-brand-glow]" />
                    </div>

                    <h3 className="mb-1 text-2xl font-bold tracking-tight">
                      {c.name}
                    </h3>
                    {c.summary ? (
                      <p className="text-sm leading-relaxed text-[--color-ink-muted] line-clamp-2">
                        {c.summary}
                      </p>
                    ) : null}

                    {/* Mini progress */}
                    <div className="mt-5 space-y-2">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[--color-ink-soft]">
                        <span>Pledged</span>
                        <span className="font-mono tabular-nums">
                          {pledgedPct.toFixed(1)}%
                        </span>
                      </div>
                      <div className="relative h-1.5 overflow-hidden rounded-full bg-[--color-border-soft]">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            width: `${pledgedPct}%`,
                            background:
                              'linear-gradient(90deg, #8e5cff 0%, #e63e9d 100%)',
                          }}
                        />
                        <div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            width: `${receivedPct}%`,
                            background: 'var(--color-success)',
                            opacity: 0.7,
                          }}
                        />
                      </div>
                      <div className="flex items-baseline justify-between pt-2 text-xs text-[--color-ink-soft]">
                        <span>
                          <span className="font-mono text-base font-bold tabular-nums text-[--color-ink]">
                            {formatEthAmount(c.totalPledged)}
                          </span>
                          <span className="ml-1 text-[10px]">ETH pledged</span>
                        </span>
                        <span className="font-mono tabular-nums">
                          / {formatEthAmount(c.targetAmount)} target
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            )
          })}

          {/* "Future campaigns" placeholder card */}
          <Card className="bg-[--color-bg-elevated]/40">
            <CardBody className="flex h-full flex-col items-start justify-between gap-4 p-6 sm:p-7">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[--color-ink-soft]">
                  Next coalition
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[--color-ink-muted]">
                  Reserved for the next incident
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[--color-ink-soft]">
                  Any major DeFi incident can spin up its own coordinated relief campaign on this platform. Document models, editors, processors and subgraphs ship as one Powerhouse package.
                </p>
              </div>
              <a
                href="https://registry.dev.vetra.io/-/web/detail/defi-united-package"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[--color-brand-border] bg-[--color-brand-soft] px-4 py-2 text-xs font-semibold text-[--color-brand-glow] transition hover:bg-[--color-brand]/20"
              >
                <Plus className="size-3.5" />
                Spin up a new campaign
              </a>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Coalition charter */}
      <Card>
        <CardHeader title="Coalition charter" description="What we coordinate, and how." />
        <CardBody>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[--color-brand-glow]">
                01 · Coalitions
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[--color-ink-muted]">
                Pool capital pledges from protocols, foundations and individuals into a single transparent campaign. Every pledge tracked publicly with its governance state.
              </p>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[--color-brand-glow]">
                02 · Dependencies
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[--color-ink-muted]">
                Track external blockers — DAO votes, council actions, on-chain transactions — that gate settlement. Close the loop between off-chain coordination and on-chain execution.
              </p>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[--color-brand-glow]">
                03 · Receipts
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[--color-ink-muted]">
                Every receipt is on-chain and reconciled against pledges automatically. Zero double-counting, zero ambiguity, zero trust required.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
