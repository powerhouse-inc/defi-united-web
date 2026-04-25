import { Badge } from '@/modules/shared/components/badge'
import type {
  DefiUnited_PledgeStatus,
  DefiUnited_DependencyStatus,
  DefiUnited_CampaignStatus,
} from '@/modules/__generated__/graphql/gql-generated'

export function PledgeStatusBadge({ status }: { status: DefiUnited_PledgeStatus | string }) {
  switch (status) {
    case 'CONFIRMED':
      return <Badge tone="info">Confirmed</Badge>
    case 'RECEIVED':
      return <Badge tone="success">Received</Badge>
    case 'GOVERNANCE_PENDING':
      return <Badge tone="warning">Governance pending</Badge>
    case 'PROPOSED':
      return <Badge tone="neutral">Proposed</Badge>
    case 'CANCELLED':
      return <Badge tone="neutral">Cancelled</Badge>
    case 'FAILED':
      return <Badge tone="danger">Failed</Badge>
    default:
      return <Badge tone="neutral">{String(status)}</Badge>
  }
}

export function DependencyStatusBadge({
  status,
}: {
  status: DefiUnited_DependencyStatus | string
}) {
  switch (status) {
    case 'RESOLVED':
      return <Badge tone="success">Resolved</Badge>
    case 'IN_PROGRESS':
      return <Badge tone="warning">In progress</Badge>
    case 'OPEN':
      return <Badge tone="neutral">Open</Badge>
    case 'BLOCKED':
      return <Badge tone="danger">Blocked</Badge>
    case 'ABANDONED':
      return <Badge tone="neutral">Abandoned</Badge>
    default:
      return <Badge tone="neutral">{String(status)}</Badge>
  }
}

export function CampaignStatusBadge({
  status,
}: {
  status: DefiUnited_CampaignStatus | string
}) {
  switch (status) {
    case 'ACTIVE':
      return <Badge tone="brand">Active</Badge>
    case 'EXECUTING':
      return <Badge tone="info">Executing</Badge>
    case 'RESOLVED':
      return <Badge tone="success">Resolved</Badge>
    case 'DRAFT':
      return <Badge tone="neutral">Draft</Badge>
    case 'FAILED':
      return <Badge tone="danger">Failed</Badge>
    case 'ARCHIVED':
      return <Badge tone="neutral">Archived</Badge>
    default:
      return <Badge tone="neutral">{String(status)}</Badge>
  }
}
