import { notFound } from 'next/navigation'
import { fetchCampaign } from '@/modules/campaign/queries'
import { OFFLINE_CAMPAIGN } from '@/modules/campaign/offline-fallback'
import { CampaignHero } from '@/modules/campaign/components/hero'
import { ContributorsTable } from '@/modules/campaign/components/contributors-table'
import { DependencyGrid } from '@/modules/campaign/components/dependency-grid'
import { StatusTimeline } from '@/modules/campaign/components/timeline'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let campaign = null
  try {
    campaign = await fetchCampaign(slug)
  } catch {
    if (slug === OFFLINE_CAMPAIGN.slug) campaign = OFFLINE_CAMPAIGN
  }
  if (!campaign) {
    if (slug === OFFLINE_CAMPAIGN.slug) campaign = OFFLINE_CAMPAIGN
    else notFound()
  }
  if (!campaign) notFound()

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
      <CampaignHero slug={campaign.slug} initial={campaign} />

      <ContributorsTable contributors={campaign.contributorsPublic} />

      <DependencyGrid
        dependencies={campaign.dependenciesPublic}
        resolved={campaign.dependenciesResolved}
        blocking={campaign.dependenciesBlocking}
      />

      <Card>
        <CardHeader
          title="On-chain receipts"
          description="Verified inbound transfers to the campaign contribution addresses."
        />
        <CardBody>
          <p className="text-sm text-[--color-ink-soft]">
            No receipts confirmed yet. The receipt processor publishes here automatically
            as funds land at the published address.
          </p>
        </CardBody>
      </Card>

      <StatusTimeline updates={campaign.recentUpdates} />
    </div>
  )
}
