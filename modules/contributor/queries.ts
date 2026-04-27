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

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Resolve a contributor by either UUID id or slugified display name. The
 * contributor-registry subgraph only indexes by id; this helper bridges the
 * slug-based URLs the app links to.
 *
 * When multiple profiles share the same display name (e.g., a campaign drive
 * was cloned), prefer the profile whose participation lives in the canonical
 * (non-cloned) campaign. Falls back to the first match otherwise.
 */
export async function fetchContributorBySlugOrId(
  slugOrId: string,
): Promise<ContributorDetail | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId)
  if (isUuid) {
    const direct = await fetchContributor(slugOrId)
    if (direct) return direct
  }
  const list = await fetchContributors()
  const matches = list.filter((c) => slugify(c.displayName) === slugOrId)
  if (matches.length === 0) return null
  if (matches.length === 1) return await fetchContributor(matches[0].id)

  // Multiple profiles with same display name — fetch each, prefer the one
  // whose participation does NOT include "-clone" slugs.
  const detailed = await Promise.all(matches.map((m) => fetchContributor(m.id)))
  const canonical = detailed.find(
    (d) =>
      d &&
      d.campaignParticipation.length > 0 &&
      d.campaignParticipation.every((p) => !p.campaignSlug.includes('-clone')),
  )
  return canonical ?? detailed.find((d) => d) ?? null
}
