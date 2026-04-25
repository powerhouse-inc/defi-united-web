'use client'

import { CopyButton } from '@/modules/shared/components/copy-button'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { SWITCHBOARD_URL } from '@/modules/shared/lib/graphql-client'

const QUERY = `query {
  DefiUnited_campaign(slug: "rseth-2026-04") {
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

export function EmbedSnippet() {
  const curl = `curl -s ${SWITCHBOARD_URL} \\
  -H 'Content-Type: application/json' \\
  -d '${JSON.stringify({ query: QUERY.replace(/\n/g, ' ') })}'`

  return (
    <Card>
      <CardHeader
        title="Embed live data on your dashboard"
        description="Every number on this page comes from the same public GraphQL query. Drop it into your Notion, Substack, or status page."
      />
      <CardBody className="space-y-4">
        <div className="relative">
          <div className="absolute right-3 top-3">
            <CopyButton value={QUERY} label="Copy query" />
          </div>
          <pre className="overflow-x-auto rounded-xl border border-[--color-border] bg-[#0a0e1a] p-4 text-xs leading-relaxed text-slate-100">
{QUERY}
          </pre>
        </div>
        <div className="relative">
          <div className="absolute right-3 top-3">
            <CopyButton value={curl} label="Copy curl" />
          </div>
          <pre className="overflow-x-auto rounded-xl border border-[--color-border] bg-[--color-border-soft] p-4 text-xs leading-relaxed text-[--color-ink-muted]">
{curl}
          </pre>
        </div>
      </CardBody>
    </Card>
  )
}
