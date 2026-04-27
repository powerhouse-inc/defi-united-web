'use client'

import { use } from 'react'
import Link from 'next/link'
import { ExternalLink, ArrowLeft, Shield, HandCoins } from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { Badge } from '@/modules/shared/components/badge'
import { PledgeStatusBadge } from '@/modules/campaign/components/status-badge'
import { formatEthAmount } from '@/modules/shared/lib/format'
import { useQuery } from '@tanstack/react-query'
import { fetchContributorBySlugOrId } from '@/modules/contributor/queries'

function SkeletonCard() {
  return (
    <Card>
      <CardHeader
        title={<div className="h-5 w-40 rounded shimmer" />}
        description={<div className="mt-2 h-4 w-56 rounded shimmer" />}
        right={<div className="h-6 w-16 rounded shimmer" />}
      />
      <CardBody className="space-y-3">
        <div className="h-4 w-48 rounded shimmer" />
        <div className="h-4 w-36 rounded shimmer" />
      </CardBody>
    </Card>
  )
}

export default function ContributorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const { data: contributor, isLoading, error } = useQuery({
    queryKey: ['contributor', slug],
    queryFn: async () => {
      try {
        return await fetchContributorBySlugOrId(slug)
      } catch {
        return null
      }
    },
    staleTime: 10_000,
    refetchInterval: 15_000,
  })

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="h-8 w-32 rounded shimmer" />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  if (error || !contributor) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Card>
          <CardBody className="text-center py-12">
            <div className="inline-grid h-12 w-12 place-items-center rounded-full bg-[--color-border-soft] text-[--color-ink-soft]">
              <ArrowLeft className="size-5" />
            </div>
            <p className="mt-4 text-sm font-medium">
              Contributor &quot;{slug}&quot; not found.
            </p>
            <Link href="/" className="mt-3 inline-block text-sm text-[--color-brand] hover:underline">
              ← Back to campaign
            </Link>
          </CardBody>
        </Card>
      </div>
    )
  }

  // Compute totals
  const totalPledged = contributor.campaignParticipation.reduce(
    (sum, p) => sum + (Number(p.pledgedAmount) || 0), 0
  )
  const campaigns = contributor.campaignParticipation.length

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-[--color-ink-soft] hover:text-[--color-ink]"
      >
        <ArrowLeft className="size-4" /> Back to campaign
      </Link>

      {/* Profile card */}
      <Card>
        <CardHeader
          title={
            <div className="flex items-center gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-xl text-white text-sm font-bold"
                style={{
                  background:
                    'linear-gradient(135deg, #8e5cff 0%, #e63e9d 100%)',
                }}
              >
                {contributor.displayName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-base font-semibold tracking-tight">{contributor.displayName}</div>
                <div className="text-xs text-[--color-ink-soft]">
                  {contributor.kind.toLowerCase()} · {contributor.trustLevel.toLowerCase()}
                </div>
              </div>
            </div>
          }
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
              href={`https://x.com/${contributor.twitterHandle.replace(/^@/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="text-[--color-ink-muted] hover:underline"
            >
              @{contributor.twitterHandle.replace(/^@/, '')}
            </a>
          ) : null}
          {contributor.farcasterHandle ? (
            <span className="text-[--color-ink-muted]">{contributor.farcasterHandle}</span>
          ) : null}
        </CardBody>
      </Card>

      {/* Stats at a glance */}
      {campaigns > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[--color-brand]/20 bg-[--color-brand-soft] p-4">
            <div className="flex items-center gap-1.5 text-xs text-[--color-ink-soft]">
              <Shield className="size-3" />
              Campaigns
            </div>
            <div className="mt-1 text-xl font-bold text-[--color-brand]">{campaigns}</div>
          </div>
          <div className="rounded-xl border border-[--color-success]/20 bg-[--color-success-soft] p-4">
            <div className="flex items-center gap-1.5 text-xs text-[--color-ink-soft]">
              <HandCoins className="size-3" />
              Total pledged
            </div>
            <div className="mt-1 text-xl font-bold text-[--color-success]">
              {formatEthAmount(String(totalPledged))} ETH
            </div>
          </div>
        </div>
      )}

      {/* Campaign participation */}
      <Card>
        <CardHeader title="Campaign participation" />
        {contributor.campaignParticipation.length === 0 ? (
          <CardBody>
            <p className="py-6 text-center text-sm text-[--color-ink-soft]">
              This contributor has no recorded campaign pledges yet.
            </p>
          </CardBody>
        ) : (
          <ul className="divide-y divide-[--color-border-soft]">
            {contributor.campaignParticipation.map((p, i) => (
              <li
                key={`${p.campaignSlug}-${i}`}
                className="flex items-center justify-between gap-4 px-6 py-3 hover:bg-[--color-border-soft]/30"
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
                  <div className="font-semibold">
                    {formatEthAmount(p.pledgedAmount)}
                    <span className="text-xs font-normal text-[--color-ink-soft]"> {p.assetSymbol}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
