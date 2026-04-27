'use client'

import Link from 'next/link'
import { ExternalLink, Handshake, Clock } from 'lucide-react'

import { motion } from 'framer-motion'
import { Avatar } from '@/modules/shared/components/avatar'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { EmptyState } from '@/modules/shared/components/empty-state'
import { PLEDGE_ROW_VARIANTS } from '@/modules/shared/components/reveal'
import type { CampaignDetail } from '@/modules/campaign/queries'
import { PledgeStatusBadge } from './status-badge'
import { Badge } from '@/modules/shared/components/badge'
import { formatEthAmount } from '@/modules/shared/lib/format'
import type { DefiUnited_PledgeStatus } from '@/modules/__generated__/graphql/gql-generated'

type Pledge = CampaignDetail['contributorsPublic'][number]

const PLATFORM_LABELS: Record<string, string> = {
  SNAPSHOT: 'Snapshot',
  TALLY: 'Tally',
  AGORA: 'Agora',
  FORUM: 'Forum',
  BOARDROOM: 'Boardroom',
}

function PlatformBadge({
  url,
  platform,
}: {
  url: string | null | undefined
  platform: string | null | undefined
}) {
  if (!url) return null
  const label = platform ? (PLATFORM_LABELS[platform] ?? platform) : 'Proposal'
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 rounded-md border border-[--color-warning-border] bg-[--color-warning-soft] px-1.5 py-0.5 text-[10px] font-medium text-[--color-warning] hover:underline"
    >
      {label}
      <ExternalLink className="size-3" />
    </a>
  )
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function PledgeRow({ pledge, index }: { pledge: Pledge; index: number }) {
  const slug = slugify(pledge.contributorDisplayName)
  return (
    <motion.li
      className="flex items-start justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-[--color-brand-soft]/40"
      variants={PLEDGE_ROW_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      custom={index}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Avatar
            name={pledge.contributorDisplayName}
            websiteUrl={pledge.contributorWebsiteUrl}
          />
          <Link
            href={`/contributors/${slug}`}
            className="truncate text-sm font-semibold tracking-tight text-[--color-ink] hover:text-[--color-brand-glow] hover:underline"
          >
            {pledge.contributorDisplayName}
          </Link>
          {pledge.contributorTrustLevel === 'VERIFIED' ? (
            <span title="Verified contributor" className="text-[--color-success]">
              <svg className="size-3.5" viewBox="0 0 12 12" fill="none">
                <path d="M6 0L7.5 1.5L9.5 1L10 3L11.5 4L11 6L11.5 8L9.5 9L9.5 11L7.5 10.5L6 12L4.5 10.5L2.5 11L2.5 9L0.5 8L1 6L0.5 4L2.5 3L2.5 1L4.5 1.5L6 0Z" fill="currentColor" opacity="0.3"/>
                <path d="M3.5 6L5 7.5L8.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          ) : null}
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[--color-ink-soft]">
          <PledgeStatusBadge status={pledge.status} />
          {Number(pledge.pledgedAmount) === 0 && pledge.status === 'CONFIRMED' ? (
            <Badge tone="neutral">TBD</Badge>
          ) : null}
          <PlatformBadge
            url={pledge.governanceProposalUrl}
            platform={pledge.governancePlatform}
          />
          {pledge.contributorWebsiteUrl ? (
            <a
              href={pledge.contributorWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[--color-ink-soft] hover:text-[--color-ink-muted] hover:underline"
            >
              site <ExternalLink className="size-3" />
            </a>
          ) : null}
          {pledge.contributorTwitter ? (
            <a
              href={`https://x.com/${pledge.contributorTwitter.replace(/^@/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[--color-ink-soft] hover:text-[--color-ink-muted] hover:underline"
            >
              @{pledge.contributorTwitter.replace(/^@/, '')}
            </a>
          ) : null}
        </div>
        {pledge.publicNotes ? (
          <div className="mt-1 text-[11px] italic text-[--color-ink-soft]">
            {pledge.publicNotes}
          </div>
        ) : null}
      </div>
      <div className="text-right">
        {Number(pledge.pledgedAmount) > 0 ? (
          <div className="font-mono text-base font-bold tabular-nums tracking-tight text-[--color-ink]">
            {formatEthAmount(pledge.pledgedAmount)}
            <span className="ml-1 text-[10px] font-medium text-[--color-ink-soft]">
              {pledge.assetSymbol}
            </span>
          </div>
        ) : (
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[--color-ink-soft]">
            TBD
          </div>
        )}
        {pledge.receivedAmount && Number(pledge.receivedAmount) > 0 ? (
          <div className="mt-0.5 font-mono text-[11px] tabular-nums text-[--color-success]">
            ↓ {formatEthAmount(pledge.receivedAmount)} received
          </div>
        ) : null}
      </div>
    </motion.li>
  )
}

const CONFIRMED_STATUSES: DefiUnited_PledgeStatus[] = ['CONFIRMED', 'RECEIVED']
const PENDING_STATUSES: DefiUnited_PledgeStatus[] = ['PROPOSED', 'GOVERNANCE_PENDING']

export function ContributorsTable({
  contributors,
}: {
  contributors: CampaignDetail['contributorsPublic']
}) {
  const sorted = [...contributors].sort((a, b) => Number(b.pledgedAmount) - Number(a.pledgedAmount))
  const confirmed = sorted.filter((p) => CONFIRMED_STATUSES.includes(p.status))
  const pending = sorted.filter((p) => PENDING_STATUSES.includes(p.status))

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader
          title="Key contributors"
          description="Direct commitments and on-chain receipts — no further governance step needed."
          right={<Badge tone="success">{confirmed.length}</Badge>}
        />
        {confirmed.length === 0 ? (
          <CardBody>
            <EmptyState
              icon={Handshake}
              title="Waiting for first confirmed pledge"
            />
          </CardBody>
        ) : (
          <ul className="divide-y divide-[--color-border-soft]">
            {confirmed.map((p, i) => (
              <PledgeRow key={`${p.contributorDisplayName}-${i}`} pledge={p} index={i} />
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <CardHeader
          title="Awaiting ratification"
          description="DAO pledges pending on-chain or off-chain governance."
          right={<Badge tone="warning">{pending.length}</Badge>}
        />
        {pending.length === 0 ? (
          <CardBody>
            <EmptyState
              icon={Clock}
              title="All pledges have been ratified"
            />
          </CardBody>
        ) : (
          <ul className="divide-y divide-[--color-border-soft]">
            {pending.map((p, i) => (
              <PledgeRow key={`${p.contributorDisplayName}-${i}`} pledge={p} index={i} />
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
