import { gql } from 'graphql-request'
import { createAuthClient } from '@/modules/shared/lib/graphql-client'

export const MARK_PLEDGE_CONFIRMED = gql`
  mutation MarkPledgeConfirmed($campaignSlug: String!, $pledgeId: String!) {
    DefiUnited_markPledgeConfirmed(campaignSlug: $campaignSlug, pledgeId: $pledgeId) {
      success
      operatorAddress
      error
    }
  }
`

export const RESOLVE_DEPENDENCY = gql`
  mutation ResolveDependency($campaignSlug: String!, $dependencyId: String!) {
    DefiUnited_resolveDependency(campaignSlug: $campaignSlug, dependencyId: $dependencyId) {
      success
      operatorAddress
      error
    }
  }
`

export const CANCEL_PLEDGE = gql`
  mutation CancelPledge($campaignSlug: String!, $pledgeId: String!, $reason: String) {
    DefiUnited_cancelPledge(
      campaignSlug: $campaignSlug
      pledgeId: $pledgeId
      reason: $reason
    ) {
      success
      operatorAddress
      error
    }
  }
`

export type OperationResult = {
  success: boolean
  operatorAddress?: string | null
  error?: string | null
}

export async function callMarkConfirmed(
  getToken: () => Promise<string | null>,
  vars: { campaignSlug: string; pledgeId: string },
): Promise<OperationResult> {
  const client = createAuthClient(getToken)
  const data = await client.request<{ DefiUnited_markPledgeConfirmed: OperationResult }>(
    MARK_PLEDGE_CONFIRMED,
    vars,
  )
  return data.DefiUnited_markPledgeConfirmed
}

export async function callCancelPledge(
  getToken: () => Promise<string | null>,
  vars: { campaignSlug: string; pledgeId: string; reason?: string },
): Promise<OperationResult> {
  const client = createAuthClient(getToken)
  const data = await client.request<{ DefiUnited_cancelPledge: OperationResult }>(
    CANCEL_PLEDGE,
    vars,
  )
  return data.DefiUnited_cancelPledge
}

export async function callResolveDependency(
  getToken: () => Promise<string | null>,
  vars: { campaignSlug: string; dependencyId: string },
): Promise<OperationResult> {
  const client = createAuthClient(getToken)
  const data = await client.request<{ DefiUnited_resolveDependency: OperationResult }>(
    RESOLVE_DEPENDENCY,
    vars,
  )
  return data.DefiUnited_resolveDependency
}
