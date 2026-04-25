import { ExternalLink } from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
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
      className="inline-flex items-center gap-1 rounded-md bg-[--color-warning-soft] px-1.5 py-0.5 text-[11px] font-medium text-[--color-warning] hover:underline"
    >
      {label}
      <ExternalLink className="size-3" />
    </a>
  )
}

function PledgeRow({ pledge }: { pledge: Pledge }) {
  return (
    <li className="flex items-start justify-between gap-3 px-5 py-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium">
            {pledge.contributorDisplayName}
          </span>
          {pledge.contributorTrustLevel === 'VERIFIED' ? (
            <Badge tone="success">Verified</Badge>
          ) : null}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[--color-ink-soft]">
          <PledgeStatusBadge status={pledge.status} />
          <PlatformBadge
            url={pledge.governanceProposalUrl}
            platform={pledge.governancePlatform}
          />
          {pledge.contributorWebsiteUrl ? (
            <a
              href={pledge.contributorWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[--color-ink-soft] hover:underline"
            >
              site <ExternalLink className="size-3" />
            </a>
          ) : null}
          {pledge.contributorTwitter ? (
            <a
              href={`https://x.com/${pledge.contributorTwitter}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[--color-ink-soft] hover:underline"
            >
              @{pledge.contributorTwitter}
            </a>
          ) : null}
        </div>
      </div>
      <div className="text-right tabular-nums">
        <div className="text-sm font-semibold">
          {formatEthAmount(pledge.pledgedAmount)}{' '}
          <span className="text-xs font-normal text-[--color-ink-soft]">
            {pledge.assetSymbol}
          </span>
        </div>
        {pledge.receivedAmount && Number(pledge.receivedAmount) > 0 ? (
          <div className="text-xs text-[--color-success]">
            recv {formatEthAmount(pledge.receivedAmount)}
          </div>
        ) : null}
      </div>
    </li>
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
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card>
        <CardHeader
          title="Confirmed"
          description="Individuals or entities that have committed without further governance steps."
          right={<Badge tone="info">{confirmed.length}</Badge>}
        />
        {confirmed.length === 0 ? (
          <CardBody>
            <p className="text-sm text-[--color-ink-soft]">No confirmed pledges yet.</p>
          </CardBody>
        ) : (
          <ul className="divide-y divide-[--color-border-soft]">
            {confirmed.map((p, i) => (
              <PledgeRow key={`${p.contributorDisplayName}-${i}`} pledge={p} />
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <CardHeader
          title="Pending governance"
          description="Pledges awaiting on-chain or off-chain DAO ratification."
          right={<Badge tone="warning">{pending.length}</Badge>}
        />
        {pending.length === 0 ? (
          <CardBody>
            <p className="text-sm text-[--color-ink-soft]">No pending pledges.</p>
          </CardBody>
        ) : (
          <ul className="divide-y divide-[--color-border-soft]">
            {pending.map((p, i) => (
              <PledgeRow key={`${p.contributorDisplayName}-${i}`} pledge={p} />
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
