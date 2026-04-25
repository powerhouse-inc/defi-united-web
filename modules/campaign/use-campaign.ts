'use client'

import { useQuery } from '@tanstack/react-query'
import { request } from 'graphql-request'
import {
  GET_CAMPAIGN,
  type CampaignDetail,
} from './queries'
import type {
  GetCampaignQuery,
  GetCampaignQueryVariables,
} from '@/modules/__generated__/graphql/gql-generated'
import { SWITCHBOARD_URL } from '@/modules/shared/lib/graphql-client'
import { OFFLINE_CAMPAIGN } from './offline-fallback'

/**
 * Live-polling hook backing the landing thermometer. Falls back to the
 * hardcoded snapshot if the local Switchboard is unavailable so the page
 * always renders.
 */
export function useCampaign(
  slug: string,
  options?: { initialData?: CampaignDetail; pollMs?: number },
) {
  return useQuery<CampaignDetail, Error>({
    queryKey: ['campaign', slug],
    queryFn: async () => {
      try {
        const data = await request<GetCampaignQuery, GetCampaignQueryVariables>(
          SWITCHBOARD_URL,
          GET_CAMPAIGN,
          { slug },
        )
        if (!data.DefiUnited_campaign) {
          if (slug === OFFLINE_CAMPAIGN.slug) return OFFLINE_CAMPAIGN
          throw new Error(`Campaign "${slug}" not found`)
        }
        return data.DefiUnited_campaign
      } catch (err) {
        // Final fallback: return offline snapshot for the seeded campaign.
        if (slug === OFFLINE_CAMPAIGN.slug) return OFFLINE_CAMPAIGN
        throw err
      }
    },
    initialData: options?.initialData,
    refetchInterval: options?.pollMs ?? 5000,
  })
}
