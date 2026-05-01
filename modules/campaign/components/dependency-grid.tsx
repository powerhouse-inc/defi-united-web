'use client'

import * as React from 'react'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/modules/shared/lib/cn'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { EmptyState } from '@/modules/shared/components/empty-state'
import { CheckCircle } from 'lucide-react'
import { DependencyStatusBadge } from './status-badge'
import type { CampaignDetail } from '@/modules/campaign/queries'

type Dep = CampaignDetail['dependenciesPublic'][number]

const STATUS_BORDER: Record<string, string> = {
  RESOLVED: 'border-l-[--color-success] bg-[--color-success-soft]',
  IN_PROGRESS: 'border-l-[--color-warning] bg-[--color-warning-soft]',
  BLOCKED: 'border-l-[--color-danger] bg-[--color-danger-soft]',
  ABANDONED: 'border-l-[--color-ink-soft] bg-[--color-border-soft]',
  OPEN: 'border-l-[--color-border-strong] bg-[--color-bg-elevated]/40',
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

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && dep.externalRefUrl) {
        e.preventDefault()
        window.open(dep.externalRefUrl, '_blank', 'noreferrer')
      }
    },
    [dep.externalRefUrl],
  )

  return (
    <div
      tabIndex={dep.externalRefUrl ? 0 : undefined}
      role={dep.externalRefUrl ? 'button' : undefined}
      onKeyDown={dep.externalRefUrl ? handleKeyDown : undefined}
      className={cn(
        'rounded-xl border border-[--color-border] border-l-4 p-4 transition-all',
        'cursor-pointer select-none',
        'hover:border-[--color-brand-border] hover:scale-[1.01] hover:shadow-[0_8px_24px_-8px_rgba(142,92,255,0.4)] active:scale-[0.99]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand] focus-visible:ring-offset-2',
        borderClass,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-semibold tracking-tight text-[--color-ink]">{dep.title}</div>
        <DependencyStatusBadge status={dep.status} />
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-[--color-ink-soft]">
        {KIND_LABELS[dep.kind] ?? dep.kind}
      </div>
      {dep.description ? (
        <p className="mt-2 text-sm leading-relaxed text-[--color-ink-muted]">{dep.description}</p>
      ) : null}
      {dep.externalRefUrl ? (
        <a
          href={dep.externalRefUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[--color-brand-glow] hover:text-[--color-accent] hover:underline"
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
          <EmptyState
            icon={CheckCircle}
            title="All clear"
            description="No external dependencies are blocking this campaign."
          />
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
