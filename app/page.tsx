import { OFFLINE_CAMPAIGN } from '@/modules/campaign/offline-fallback'
import { fetchCampaign } from '@/modules/campaign/queries'
import { DEFAULT_CAMPAIGN_SLUG } from '@/modules/shared/lib/graphql-client'
import { CampaignPage } from '@/modules/campaign/components/campaign-page'

// Render at request time so each page load fetches fresh data.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  // Try fresh GraphQL fetch; fall back to offline snapshot if unreachable.
  let campaign
  try {
    campaign = (await fetchCampaign(DEFAULT_CAMPAIGN_SLUG)) ?? OFFLINE_CAMPAIGN
  } catch {
    campaign = OFFLINE_CAMPAIGN
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FundraisingEvent',
    name: campaign.name,
    description: campaign.summary,
    eventStatus: campaign.status === 'ACTIVE' ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventCanceled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    startDate: campaign.incidentDate,
    location: {
      '@type': 'VirtualLocation',
      url: 'https://defiunited.xyz',
    },
    organizer: {
      '@type': 'Organization',
      name: 'DeFi United',
      url: 'https://defiunited.xyz',
    },
    fundingGoal: {
      '@type': 'MonetaryGrant',
      amount: campaign.targetAmount,
      unit: 'ETH',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CampaignPage initial={campaign} />
    </>
  )
}
