import { gql } from 'graphql-request'
import type {
  GetCampaignQuery,
  GetCampaignQueryVariables,
  ListCampaignsQuery,
  ListCampaignsQueryVariables,
} from '@/modules/__generated__/graphql/gql-generated'
import { createPublicClient } from '@/modules/shared/lib/graphql-client'

export const GET_CAMPAIGN = gql`
  query GetCampaign($slug: String!) {
    DefiUnited_campaign(slug: $slug) {
      slug
      name
      summary
      status
      incidentDate
      targetAmount
      totalPledged
      totalReceived
      percentReceived
      pledgeCount
      dependenciesBlocking
      dependenciesResolved
      riskDisclaimer
      lastUpdateAt
      affectedAsset {
        symbol
        address
        chainId
      }
      contributionAddresses {
        chainId
        address
        label
      }
      contributorsPublic {
        contributorDisplayName
        contributorTrustLevel
        contributorWebsiteUrl
        contributorTwitter
        pledgedAmount
        receivedAmount
        assetSymbol
        status
        governanceProposalUrl
        governancePlatform
        publicNotes
      }
      dependenciesPublic {
        title
        description
        kind
        status
        externalRefUrl
        externalRefProposalId
        expectedResolution
      }
      recentUpdates {
        id
        publishedAt
        title
        body
        metricsTotalPledged
        metricsTotalReceived
        externalAnnouncements {
          platform
          url
        }
      }
      externalLinks {
        label
        url
      }
    }
  }
`

export const LIST_CAMPAIGNS = gql`
  query ListCampaigns($status: DefiUnited_CampaignStatus) {
    DefiUnited_campaigns(status: $status) {
      slug
      name
      summary
      status
      targetAmount
      totalPledged
      totalReceived
      percentReceived
      lastUpdateAt
    }
  }
`

export type CampaignDetail = NonNullable<GetCampaignQuery['DefiUnited_campaign']>

export async function fetchCampaign(slug: string): Promise<CampaignDetail | null> {
  const client = createPublicClient()
  const data = await client.request<GetCampaignQuery, GetCampaignQueryVariables>(
    GET_CAMPAIGN,
    { slug },
  )
  return data.DefiUnited_campaign ?? null
}

export async function fetchCampaigns(
  vars: ListCampaignsQueryVariables = {},
): Promise<ListCampaignsQuery['DefiUnited_campaigns']> {
  const client = createPublicClient()
  const data = await client.request<ListCampaignsQuery, ListCampaignsQueryVariables>(
    LIST_CAMPAIGNS,
    vars,
  )
  return data.DefiUnited_campaigns
}
