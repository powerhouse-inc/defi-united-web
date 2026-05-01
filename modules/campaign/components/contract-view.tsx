'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { Badge } from '@/modules/shared/components/badge'
import { ExternalLink, Shield, Activity, Database, Eye } from 'lucide-react'
import type { CampaignDetail } from '@/modules/campaign/queries'
import { formatEthAmount, shortenAddress } from '@/modules/shared/lib/format'
import { Reveal } from '@/modules/shared/components/reveal'

const CHAIN_EXPLORERS: Record<number, string> = {
  1: 'https://etherscan.io',
  10: 'https://optimistic.etherscan.io',
  137: 'https://polygonscan.com',
  42161: 'https://arbiscan.io',
  8453: 'https://basescan.org',
}

export function ContractView({
  campaign,
}: {
  campaign: CampaignDetail
}) {
  const address = campaign.contributionAddresses[0]
  if (!address) return null

  const explorerBase = CHAIN_EXPLORERS[address.chainId] ?? 'https://etherscan.io'
  const addressUrl = `${explorerBase}/address/${address.address}`
  const txsUrl = `${explorerBase}/address/${address.address}#transactions`
  const duneUrl = `https://dune.com/queries?q=select%20*%20from%20ethereum.transactions%20where%20to%20=%20'${address.address}'`

  const received = Number(campaign.totalReceived) || 0
  const target = Number(campaign.targetAmount ?? 0) || 0
  const remaining = Math.max(target - Number(campaign.totalPledged) || 0, 0)

  const stats = [
    {
      icon: Shield,
      label: 'Total raised',
      value: `${formatEthAmount(campaign.totalPledged)} ETH`,
      sub: `${campaign.pledgeCount} contributors`,
      tone: 'brand' as const,
    },
    {
      icon: Activity,
      label: 'Balance',
      value: `${formatEthAmount(campaign.totalReceived)} ETH`,
      sub: received > 0 ? 'confirmed' : 'awaiting deposits',
      tone: 'success' as const,
    },
    {
      icon: Database,
      label: 'Dependencies',
      value: `${campaign.dependenciesResolved} / ${campaign.dependenciesResolved + campaign.dependenciesBlocking}`,
      sub: campaign.dependenciesBlocking > 0 ? `${campaign.dependenciesBlocking} blocking` : 'all clear',
      tone: campaign.dependenciesBlocking > 0 ? 'warning' as const : 'success' as const,
    },
    {
      icon: Eye,
      label: 'Remaining',
      value: `${formatEthAmount(String(remaining))} ETH`,
      sub: `of ${formatEthAmount(campaign.targetAmount)}`,
      tone: 'neutral' as const,
    },
  ]

  return (
    <Reveal delay={0.05}>
      <Card tier="inset">
        <CardHeader
          title="Live treasury"
          description="Total raised on-chain — every receipt is verifiable."
          right={
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full"
                  style={{ background: 'var(--color-success)', opacity: 0.5 }}
                />
                <span
                  className="relative inline-flex size-2 rounded-full"
                  style={{ background: 'var(--color-success)' }}
                />
              </span>
              <Badge tone="success">Live</Badge>
            </div>
          }
        />
        <CardBody className="@container">
          {/* Contract address bar */}
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-[--color-border] bg-[--color-bg-elevated]/60 p-3 sm:mb-5">
            <div
              className="hidden size-9 shrink-0 items-center justify-center rounded-lg text-white sm:flex"
              style={{ background: 'linear-gradient(135deg, #8e5cff 0%, #e63e9d 100%)' }}
            >
              <Database className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-wider text-[--color-ink-soft]">Treasury</div>
              <a
                href={addressUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-mono text-sm text-[--color-brand-glow] hover:text-[--color-accent] hover:underline"
              >
                <span className="truncate">{address.address}</span>
                <ExternalLink className="size-3 shrink-0" />
              </a>
            </div>
            <Badge tone="neutral" className="hidden sm:inline-flex">{address.label || address.chainId}</Badge>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2 @sm:gap-3 @md:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              const toneBorder: Record<string, string> = {
                brand: 'border-[--color-brand-border] bg-[--color-brand-soft]',
                success: 'border-[--color-success-border] bg-[--color-success-soft]',
                warning: 'border-[--color-warning-border] bg-[--color-warning-soft]',
                neutral: 'border-[--color-border] bg-[--color-bg-elevated]/40',
              }
              const toneText: Record<string, string> = {
                brand: 'text-[--color-brand-glow]',
                success: 'text-[--color-success]',
                warning: 'text-[--color-warning]',
                neutral: 'text-[--color-ink]',
              }

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`rounded-xl border p-3 transition-colors ${toneBorder[stat.tone]}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[--color-ink-soft]">
                    <Icon className="size-3 shrink-0" />
                    <span className="truncate">{stat.label}</span>
                  </div>
                  <div className={`mt-1.5 font-mono text-base font-bold tabular-nums ${toneText[stat.tone]}`}>
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[10px] text-[--color-ink-soft]">{stat.sub}</div>
                </motion.div>
              )
            })}
          </div>

          {/* Explorer links */}
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5">
            <ExplorerLink href={addressUrl} label="Etherscan" />
            <ExplorerLink href={txsUrl} label="Transactions" />
            <ExplorerLink href={duneUrl} label="Dune" />
          </div>
        </CardBody>
      </Card>
    </Reveal>
  )
}

function ExplorerLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-[--color-border] bg-[--color-bg-elevated]/60 px-3 py-2 text-xs font-medium text-[--color-ink-muted] transition-colors hover:border-[--color-brand-border] hover:bg-[--color-brand-soft] hover:text-[--color-brand-glow]"
    >
      {label}
      <ExternalLink className="size-3" />
    </a>
  )
}
