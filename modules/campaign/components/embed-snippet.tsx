'use client'

import { CopyButton } from '@/modules/shared/components/copy-button'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { Badge } from '@/modules/shared/components/badge'
import { SWITCHBOARD_URL } from '@/modules/shared/lib/graphql-client'

export function EmbedSnippet({ slug }: { slug: string }) {
  const QUERY = `query {
  DefiUnited_campaign(slug: "${slug}") {
    name
    totalPledged
    totalReceived
    percentReceived
    contributorsPublic {
      contributorDisplayName
      pledgedAmount
      status
    }
  }
}`

  const curl = `curl -s ${SWITCHBOARD_URL} \\
  -H 'Content-Type: application/json' \\
  -d '${JSON.stringify({ query: QUERY.replace(/\n/g, ' ') })}'`

  return (
    <Card tier="inset">
      <CardHeader
        title="Embed live data anywhere"
        description="Every number on this page is one public GraphQL query. Drop it into Notion, Substack, or a custom status page — no API key needed."
        right={<Badge tone="info">Public · GraphQL</Badge>}
      />
      <CardBody className="space-y-4">
        <div className="relative">
          <div className="absolute right-3 top-3 z-10">
            <CopyButton value={QUERY} label="Copy" />
          </div>
          <pre
            className="overflow-x-auto rounded-xl border p-4 font-mono text-xs leading-relaxed"
            style={{
              background:
                'linear-gradient(135deg, #0a0a14 0%, #15172a 100%)',
              borderColor: 'rgba(142,92,255,0.18)',
              color: '#ecedf7',
              boxShadow:
                'inset 0 1px 0 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(142,92,255,0.08)',
            }}
          >
{QUERY}
          </pre>
        </div>
        <div className="relative">
          <div className="absolute right-3 top-3 z-10">
            <CopyButton value={curl} label="Copy" />
          </div>
          <pre
            className="overflow-x-auto rounded-xl border p-4 font-mono text-xs leading-relaxed"
            style={{
              background: '#11121f',
              borderColor: 'rgba(142,92,255,0.14)',
              color: '#9ea2bd',
            }}
          >
{curl}
          </pre>
        </div>
      </CardBody>
    </Card>
  )
}
