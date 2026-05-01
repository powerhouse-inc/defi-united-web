'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import type { CampaignDetail } from '@/modules/campaign/queries'

type FaqItem = { q: string; a: React.ReactNode }

function buildFaqs(campaign: CampaignDetail): FaqItem[] {
  const asset = campaign.affectedAsset?.symbol ?? 'the affected asset'
  const incidentDate = campaign.incidentDate
    ? new Date(campaign.incidentDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      })
    : null
  const incidentRef = incidentDate
    ? `the ${incidentDate} ${asset} incident`
    : `the ${asset} incident`
  const campaignName = campaign.name

  return [
    {
      q: 'What is DeFi United?',
      a: `DeFi United is a coordinated relief effort led by Aave service providers following ${incidentRef}. Major protocols, foundations and individuals pledge funds toward a coordinated remediation, with every pledge, dependency and on-chain receipt tracked publicly. The coalition operates the platform — ${campaignName} is its first campaign.`,
    },
    {
      q: 'How will the contributions be used?',
      a: `The ETH and stablecoins contributed are used to restore ${asset}'s backing, helping normalise market conditions across the protocols affected by the incident. A public distribution plan governs how the recovered funds reach affected holders.`,
    },
    {
      q: 'Will more campaigns run on this platform?',
      a: `Yes. DeFi United is the platform; ${campaignName} is the first incident it coordinates. The same document models, editors and subgraphs that run this campaign are reusable for any future major DeFi incident.`,
    },
    {
      q: 'Are pledges binding?',
      a: 'Pledges marked "governance pending" depend on the originating DAO ratifying them. Pledges marked "confirmed" reflect a hard commitment by an individual or entity. Track everything on-chain.',
    },
    {
      q: 'Where do contributions go?',
      a: campaign.contributionAddresses[0]
        ? `Funds land at ${campaign.contributionAddresses[0].address}, the published contribution address. The address and balance can be independently verified on Etherscan; status updates here only reflect on-chain receipts.`
        : 'Funds land at the published contribution address. The address and balance can be independently verified on Etherscan; status updates here only reflect on-chain receipts.',
    },
    {
      q: 'Can I build on this data?',
      a: 'Yes. The full read API is GraphQL, public, and unauthenticated. The schema is right above this section.',
    },
    {
      q: 'How do I run my own crisis response?',
      a: 'Fork the defi-united-package from the Powerhouse registry. The document models, editors, and subgraphs all ship together.',
    },
  ]
}

export function Faq({
  campaign,
  riskDisclaimer,
}: {
  campaign: CampaignDetail
  riskDisclaimer: string | null | undefined
}) {
  const faqs = buildFaqs(campaign)
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_minmax(0,360px)]">
      <Card>
        <CardHeader title="Frequently asked questions" />
        <CardBody className="pt-0">
          <Accordion.Root type="single" collapsible className="not-prose">
            {faqs.map((item, index) => (
              <Accordion.Item
                key={item.q}
                value={`item-${index}`}
                className="border-b border-[--color-border-soft] first:pt-5 last:border-b-0"
              >
                <Accordion.Trigger className="group flex w-full items-center justify-between py-3 text-left text-sm font-semibold transition-colors hover:text-[--color-ink-soft] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent] focus-visible:ring-offset-2">
                  {item.q}
                  <ChevronDown className="h-4 w-4 shrink-0 text-[--color-ink-soft] transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-radix-accordion-close data-[state=open]:animate-radix-accordion-open">
                  <div className="pb-3 text-sm text-[--color-ink-muted]">{item.a}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </CardBody>
      </Card>
      {riskDisclaimer ? (
        <Card className="border-[--color-warning-border] bg-[--color-warning-soft]">
          <CardHeader title="Risk disclaimer" />
          <CardBody>
            <p className="text-sm leading-relaxed text-[--color-ink-muted]">{riskDisclaimer}</p>
          </CardBody>
        </Card>
      ) : null}
    </div>
  )
}
