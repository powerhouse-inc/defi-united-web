import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'

type FaqItem = { q: string; a: React.ReactNode }

const FAQS: FaqItem[] = [
  {
    q: 'What is DeFi United?',
    a: 'A coordinated industry response to a major DeFi incident. Major protocols, foundations, and individuals pledge funds toward a coordinated remediation, with every step tracked publicly.',
  },
  {
    q: 'Are pledges binding?',
    a: 'Pledges marked “governance pending” depend on the originating DAO ratifying them. Pledges marked “confirmed” reflect a hard commitment by an individual or entity. Track everything on-chain.',
  },
  {
    q: 'Where do contributions go?',
    a: 'Funds land at the published contribution address. The address and balance can be independently verified on Etherscan; status updates here only reflect on-chain receipts.',
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

export function Faq({ riskDisclaimer }: { riskDisclaimer: string | null | undefined }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_minmax(0,360px)]">
      <Card>
        <CardHeader title="Frequently asked questions" />
        <CardBody>
          <dl className="divide-y divide-[--color-border-soft]">
            {FAQS.map((item) => (
              <div key={item.q} className="py-3">
                <dt className="text-sm font-semibold">{item.q}</dt>
                <dd className="mt-1 text-sm text-[--color-ink-muted]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </CardBody>
      </Card>
      {riskDisclaimer ? (
        <Card className="bg-amber-50/60">
          <CardHeader title="Risk disclaimer" />
          <CardBody>
            <p className="text-sm text-[--color-ink-muted]">{riskDisclaimer}</p>
          </CardBody>
        </Card>
      ) : null}
    </div>
  )
}
