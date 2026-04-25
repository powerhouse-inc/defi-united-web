import { NextResponse } from 'next/server'
import { fetchCampaign } from '@/modules/campaign/queries'
import { OFFLINE_CAMPAIGN } from '@/modules/campaign/offline-fallback'

export const dynamic = 'force-dynamic'

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  try {
    const data = await fetchCampaign(slug)
    if (!data) {
      if (slug === OFFLINE_CAMPAIGN.slug) {
        return NextResponse.json(OFFLINE_CAMPAIGN, {
          headers: { 'cache-control': 'public, max-age=10' },
        })
      }
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }
    return NextResponse.json(data, {
      headers: {
        'cache-control': 'public, max-age=10',
        'access-control-allow-origin': '*',
      },
    })
  } catch (err) {
    if (slug === OFFLINE_CAMPAIGN.slug) {
      return NextResponse.json(OFFLINE_CAMPAIGN, {
        headers: { 'cache-control': 'public, max-age=10' },
      })
    }
    return NextResponse.json(
      { error: 'switchboard_unavailable', detail: String(err) },
      { status: 503 },
    )
  }
}
