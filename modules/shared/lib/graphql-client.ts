import { GraphQLClient } from 'graphql-request'

export const SWITCHBOARD_URL =
  process.env.NEXT_PUBLIC_SWITCHBOARD_URL ?? 'http://localhost:4001/graphql'

export const DEFAULT_CAMPAIGN_SLUG =
  process.env.NEXT_PUBLIC_DEFAULT_CAMPAIGN_SLUG ?? 'rseth-2026-04'

/**
 * Plain unauthenticated client for public reads. Used both client-side
 * (under TanStack Query) and from server route handlers.
 */
export function createPublicClient(): GraphQLClient {
  return new GraphQLClient(SWITCHBOARD_URL, {
    // Server-side fetch caching is left to caller; client-side reads pass
    // through TanStack Query for polling/dedupe.
    cache: 'no-store',
  })
}

/**
 * Authenticated client for operator mutations. Token is fetched on every
 * call so a stale Renown identity rotation surfaces immediately.
 */
export function createAuthClient(getToken: () => Promise<string | null>): GraphQLClient {
  return new GraphQLClient(SWITCHBOARD_URL, {
    requestMiddleware: async (req) => {
      const token = await getToken()
      if (!token) return req
      return {
        ...req,
        headers: {
          ...(req.headers as Record<string, string> | undefined),
          authorization: `Bearer ${token}`,
        },
      }
    },
  })
}
