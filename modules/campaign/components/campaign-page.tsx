'use client'

import { useCampaign } from '@/modules/campaign/use-campaign'
import type { CampaignDetail } from '@/modules/campaign/queries'
import { CampaignHero } from './hero'
import { ContributionAddressCard } from './contribution-address'
import { ContributorsTable } from './contributors-table'
import { ContractView } from './contract-view'
import { ProgressSection } from './progress-section'
import { DependencyGrid } from './dependency-grid'
import { StatusTimeline } from './timeline'
import { EmbedSnippet } from './embed-snippet'
import { Faq } from './faq'
import { LiveTicker } from './live-ticker'
import { Reveal } from '@/modules/shared/components/reveal'

/**
 * Client wrapper that polls the live campaign via GraphQL and feeds every
 * section with the freshest data. Server-side render hydrates with the
 * offline-fallback snapshot so the page is always paintable.
 */
export function CampaignPage({ initial }: { initial: CampaignDetail }) {
  const { data } = useCampaign(initial.slug, {
    initialData: initial,
    pollMs: 5000,
  })
  const raw = data ?? initial
  // Layer the on-chain live overlay on top of the document-derived total so
  // every downstream section (hero, thermometer, progress, contract view,
  // FAQ, etc.) shows the same number — receipts that the processor has
  // recorded + pending value the live overlay can see in the treasury.
  const docReceived = Number(raw.totalReceived) || 0
  const pending = Number(raw.pendingReceiptsEthEquivalent ?? 0) || 0
  const layered = docReceived + pending
  const c: CampaignDetail = {
    ...raw,
    totalReceived: String(layered),
  }

  return (
    <div className="flex w-full flex-col gap-0">
      <CampaignHero slug={c.slug} initial={c} />

      <LiveTicker campaign={c} />

      <div className="mx-auto w-full max-w-6xl flex flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-10">
        <ContractView campaign={c} />

        <Reveal delay={0}>
          <div
            id="contribute"
            className="flex flex-col gap-6 scroll-mt-24"
          >
            <ContributionAddressCard addresses={c.contributionAddresses} />
            <ContributorsTable contributors={c.contributorsPublic} />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ProgressSection
            totalPledged={c.totalPledged}
            totalReceived={c.totalReceived}
            targetAmount={c.targetAmount}
            pledgeCount={c.pledgeCount}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div id="dependencies" className="scroll-mt-24">
            <DependencyGrid
              dependencies={c.dependenciesPublic}
              resolved={c.dependenciesResolved}
              blocking={c.dependenciesBlocking}
            />
          </div>
        </Reveal>

        {c.recentUpdates && c.recentUpdates.length > 0 ? (
          <Reveal delay={0.12}>
            <StatusTimeline updates={c.recentUpdates} />
          </Reveal>
        ) : null}

        <Reveal delay={0.15}>
          <EmbedSnippet slug={c.slug} />
        </Reveal>

        <Reveal delay={0.2}>
          <Faq campaign={c} riskDisclaimer={c.riskDisclaimer} />
        </Reveal>
      </div>
    </div>
  )
}
