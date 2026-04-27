import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { EmptyState } from '@/modules/shared/components/empty-state'
import { formatDateTime } from '@/modules/shared/lib/format'
import { ExternalLink, MessageSquare } from 'lucide-react'
import type { CampaignDetail } from '@/modules/campaign/queries'

export function StatusTimeline({
  updates,
}: {
  updates: CampaignDetail['recentUpdates']
}) {
  if (updates.length === 0) {
    return (
      <Card>
        <CardHeader title="Status updates" />
        <CardBody>
          <EmptyState
            icon={MessageSquare}
            title="First update will appear here"
            description="Operators publish status updates as governance votes settle and funds land on-chain. This feed stays silent until there's something to report."
          />
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader title="Status updates" />
      <CardBody className="space-y-6">
        {updates.map((u) => (
          <div key={u.id} className="border-l-2 border-[--color-border] pl-4">
            <div className="text-xs text-[--color-ink-soft]">
              {formatDateTime(u.publishedAt)}
            </div>
            <div className="mt-0.5 text-base font-semibold">{u.title}</div>
            <p className="mt-1 whitespace-pre-line text-sm text-[--color-ink-muted]">
              {u.body}
            </p>
            {u.externalAnnouncements?.length ? (
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {u.externalAnnouncements.map((a, i) => (
                  <a
                    key={`${a.platform}-${i}`}
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-[--color-border-soft] px-2 py-1 text-[--color-ink-muted] hover:bg-[--color-bg]"
                  >
                    {a.platform} <ExternalLink className="size-3" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </CardBody>
    </Card>
  )
}
