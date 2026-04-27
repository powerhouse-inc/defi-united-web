import { notFound } from 'next/navigation'
import { OFFLINE_CAMPAIGN } from '@/modules/campaign/offline-fallback'
import { fetchCampaign } from '@/modules/campaign/queries'
import { CampaignPage } from '@/modules/campaign/components/campaign-page'

// Render at request time so each slug fetches fresh data from Switchboard.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let campaign
  try {
    campaign = await fetchCampaign(slug)
  } catch {
    campaign = null
  }

  // Fallback for the seeded slug when Switchboard is unavailable. Any other
  // unknown slug 404s.
  if (!campaign) {
    if (slug === OFFLINE_CAMPAIGN.slug) {
      campaign = OFFLINE_CAMPAIGN
    } else {
      notFound()
    }
  }

  return <CampaignPage initial={campaign} />
}
