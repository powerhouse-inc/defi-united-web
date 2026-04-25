import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { fetchContributor } from '@/modules/contributor/queries'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { Badge } from '@/modules/shared/components/badge'
import { PledgeStatusBadge } from '@/modules/campaign/components/status-badge'
import { formatEthAmount } from '@/modules/shared/lib/format'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function ContributorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let contributor = null
  try {
    contributor = await fetchContributor(slug)
  } catch {
    contributor = null
  }
  if (!contributor) notFound()

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
      <Card>
        <CardHeader
          title={contributor.displayName}
          description={`${contributor.kind.toLowerCase()} · trust ${contributor.trustLevel.toLowerCase()}`}
          right={
            contributor.trustLevel === 'VERIFIED' ? (
              <Badge tone="success">Verified</Badge>
            ) : (
              <Badge tone="neutral">{contributor.trustLevel}</Badge>
            )
          }
        />
        <CardBody className="flex flex-wrap items-center gap-3 text-sm">
          {contributor.websiteUrl ? (
            <a
              href={contributor.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[--color-brand] hover:underline"
            >
              {contributor.websiteUrl} <ExternalLink className="size-3.5" />
            </a>
          ) : null}
          {contributor.twitterHandle ? (
            <a
              href={`https://x.com/${contributor.twitterHandle}`}
              target="_blank"
              rel="noreferrer"
              className="text-[--color-ink-muted] hover:underline"
            >
              @{contributor.twitterHandle}
            </a>
          ) : null}
          {contributor.farcasterHandle ? (
            <span className="text-[--color-ink-muted]">{contributor.farcasterHandle}</span>
          ) : null}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Campaign participation" />
        {contributor.campaignParticipation.length === 0 ? (
          <CardBody>
            <p className="text-sm text-[--color-ink-soft]">
              This contributor has no recorded campaign pledges yet.
            </p>
          </CardBody>
        ) : (
          <ul className="divide-y divide-[--color-border-soft]">
            {contributor.campaignParticipation.map((p, i) => (
              <li
                key={`${p.campaignSlug}-${i}`}
                className="flex items-center justify-between gap-4 px-6 py-3"
              >
                <div>
                  <Link
                    href={`/campaigns/${p.campaignSlug}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {p.campaignName}
                  </Link>
                  <div className="mt-1">
                    <PledgeStatusBadge status={p.pledgeStatus} />
                  </div>
                </div>
                <div className="text-right text-sm tabular-nums">
                  {formatEthAmount(p.pledgedAmount)}{' '}
                  <span className="text-xs text-[--color-ink-soft]">{p.assetSymbol}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
