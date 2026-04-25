import { ExternalLink } from 'lucide-react'
import { cn } from '@/modules/shared/lib/cn'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { DependencyStatusBadge } from './status-badge'
import type { CampaignDetail } from '@/modules/campaign/queries'

type Dep = CampaignDetail['dependenciesPublic'][number]

const STATUS_BORDER: Record<string, string> = {
  RESOLVED: 'border-l-[--color-success] bg-green-50/40',
  IN_PROGRESS: 'border-l-[--color-warning] bg-amber-50/40',
  BLOCKED: 'border-l-[--color-danger] bg-red-50/40',
  ABANDONED: 'border-l-[--color-ink-soft] bg-slate-50/40',
  OPEN: 'border-l-[--color-border] bg-white',
}

const KIND_LABELS: Record<string, string> = {
  GOVERNANCE_VOTE: 'Governance vote',
  COUNCIL_ACTION: 'Council action',
  ONCHAIN_TX: 'On-chain tx',
  OPERATIONAL: 'Operational',
  OTHER: 'Other',
}

function DependencyTile({ dep }: { dep: Dep }) {
  const borderClass = STATUS_BORDER[dep.status] ?? STATUS_BORDER.OPEN
  return (
    <div
      className={cn(
        'rounded-xl border border-[--color-border] border-l-4 p-4 transition-colors',
        borderClass,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-semibold">{dep.title}</div>
        <DependencyStatusBadge status={dep.status} />
      </div>
      <div className="mt-1 text-xs text-[--color-ink-soft]">
        {KIND_LABELS[dep.kind] ?? dep.kind}
      </div>
      {dep.description ? (
        <p className="mt-2 text-sm text-[--color-ink-muted]">{dep.description}</p>
      ) : null}
      {dep.externalRefUrl ? (
        <a
          href={dep.externalRefUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs text-[--color-brand] hover:underline"
        >
          Open reference <ExternalLink className="size-3" />
        </a>
      ) : null}
    </div>
  )
}

export function DependencyGrid({
  dependencies,
  resolved,
  blocking,
}: {
  dependencies: CampaignDetail['dependenciesPublic']
  resolved: number
  blocking: number
}) {
  return (
    <Card>
      <CardHeader
        title="Dependencies"
        description="External actions the campaign needs to clear before pledges can land."
        right={
          <div className="flex items-center gap-3 text-xs text-[--color-ink-soft]">
            <span>
              <strong className="text-[--color-success]">{resolved}</strong> resolved
            </span>
            <span>
              <strong className="text-[--color-warning]">{blocking}</strong> blocking
            </span>
          </div>
        }
      />
      <CardBody>
        {dependencies.length === 0 ? (
          <p className="text-sm text-[--color-ink-soft]">No dependencies recorded.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {dependencies.map((d, i) => (
              <DependencyTile key={`${d.title}-${i}`} dep={d} />
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}
