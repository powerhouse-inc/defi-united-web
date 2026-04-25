import { gql } from 'graphql-request'
import type {
  GetContributorQuery,
  GetContributorQueryVariables,
  ListContributorsQuery,
  ListContributorsQueryVariables,
} from '@/modules/__generated__/graphql/gql-generated'
import { createPublicClient } from '@/modules/shared/lib/graphql-client'

export const GET_CONTRIBUTOR = gql`
  query GetContributor($id: String!) {
    DefiUnited_contributor(id: $id) {
      id
      displayName
      kind
      websiteUrl
      twitterHandle
      farcasterHandle
      trustLevel
      campaignParticipation {
        campaignSlug
        campaignName
        pledgedAmount
        receivedAmount
        pledgeStatus
        assetSymbol
      }
    }
  }
`

export const LIST_CONTRIBUTORS = gql`
  query ListContributors($trustLevel: String, $kind: String) {
    DefiUnited_contributors(trustLevel: $trustLevel, kind: $kind) {
      id
      displayName
      kind
      trustLevel
      websiteUrl
      twitterHandle
    }
  }
`

export type ContributorDetail = NonNullable<GetContributorQuery['DefiUnited_contributor']>

export async function fetchContributor(id: string): Promise<ContributorDetail | null> {
  const client = createPublicClient()
  const data = await client.request<GetContributorQuery, GetContributorQueryVariables>(
    GET_CONTRIBUTOR,
    { id },
  )
  return data.DefiUnited_contributor ?? null
}

export async function fetchContributors(
  vars: ListContributorsQueryVariables = {},
) {
  const client = createPublicClient()
  const data = await client.request<ListContributorsQuery, ListContributorsQueryVariables>(
    LIST_CONTRIBUTORS,
    vars,
  )
  return data.DefiUnited_contributors
}
