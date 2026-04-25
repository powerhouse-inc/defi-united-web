import { fetchCampaign } from '@/modules/campaign/queries'
import { OFFLINE_CAMPAIGN } from '@/modules/campaign/offline-fallback'
import { DEFAULT_CAMPAIGN_SLUG } from '@/modules/shared/lib/graphql-client'
import { CampaignHero } from '@/modules/campaign/components/hero'
import { ContributionAddressCard } from '@/modules/campaign/components/contribution-address'
import { ContributorsTable } from '@/modules/campaign/components/contributors-table'
import { DependencyGrid } from '@/modules/campaign/components/dependency-grid'
import { EmbedSnippet } from '@/modules/campaign/components/embed-snippet'
import { Faq } from '@/modules/campaign/components/faq'

export const revalidate = 0
export const dynamic = 'force-dynamic'

async function loadCampaign() {
  try {
    const c = await fetchCampaign(DEFAULT_CAMPAIGN_SLUG)
    return c ?? OFFLINE_CAMPAIGN
  } catch {
    return OFFLINE_CAMPAIGN
  }
}

export default async function Home() {
  const campaign = await loadCampaign()

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
      <CampaignHero slug={campaign.slug} initial={campaign} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_minmax(0,360px)]">
        <ContributorsTable contributors={campaign.contributorsPublic} />
        <ContributionAddressCard addresses={campaign.contributionAddresses} />
      </div>

      <DependencyGrid
        dependencies={campaign.dependenciesPublic}
        resolved={campaign.dependenciesResolved}
        blocking={campaign.dependenciesBlocking}
      />

      <EmbedSnippet />

      <Faq riskDisclaimer={campaign.riskDisclaimer} />
    </div>
  )
}
