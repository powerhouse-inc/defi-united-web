import type { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'
import { OFFLINE_CAMPAIGN } from '@/modules/campaign/offline-fallback'
import { fetchCampaign, type CampaignDetail } from '@/modules/campaign/queries'
import { DEFAULT_CAMPAIGN_SLUG } from '@/modules/shared/lib/graphql-client'
import { formatEthAmount, formatUsdShort } from '@/modules/shared/lib/format'

export const runtime = 'edge'

const W = 1200
const H = 630
const LIVE_TIMEOUT_MS = 4000

async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`
  const css = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(r => r.text())
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype|woff2)'\)/)
  if (!match) throw new Error(`font lookup failed: ${family} ${weight}`)
  return fetch(match[1]).then(r => r.arrayBuffer())
}

async function loadCampaign(slug: string): Promise<CampaignDetail | null> {
  try {
    return await Promise.race<CampaignDetail | null>([
      fetchCampaign(slug),
      new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error('og live fetch timeout')), LIVE_TIMEOUT_MS),
      ),
    ])
  } catch {
    return null
  }
}

type CampaignLike = Pick<
  CampaignDetail,
  | 'name'
  | 'summary'
  | 'status'
  | 'targetAmount'
  | 'totalPledged'
  | 'totalReceived'
  | 'headlineTotalEthEquivalent'
  | 'headlineTotalUsd'
>

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug') ?? DEFAULT_CAMPAIGN_SLUG
  const live = await loadCampaign(slug)
  const c: CampaignLike = live ?? (OFFLINE_CAMPAIGN as unknown as CampaignLike)

  const name = c.name
  const isActive = c.status === 'ACTIVE'

  const usdShort = formatUsdShort(c.headlineTotalUsd ?? null)
  const ethRaised = formatEthAmount(
    c.headlineTotalEthEquivalent ?? c.totalReceived ?? c.totalPledged ?? '0',
  )
  const target = formatEthAmount(c.targetAmount ?? '0')

  const headline = usdShort ? `$${usdShort}` : `${ethRaised} ETH`
  const supportingLine = usdShort
    ? `${ethRaised} ETH · ${target} ETH target`
    : `of ${target} ETH target`

  const allText =
    `DeFi United Coalition Live ${name} TOTAL RAISED ${headline} ${supportingLine} defiunited.space Built on Powerhouse 0123456789·,.$ETH`

  const [m500, m700, m800] = await Promise.all([
    loadGoogleFont('Manrope', 500, allText),
    loadGoogleFont('Manrope', 700, allText),
    loadGoogleFont('Manrope', 800, allText),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: 'flex',
          flexDirection: 'column',
          padding: 72,
          background: '#fafafe',
          color: '#0a0b14',
          fontFamily: 'Manrope',
          position: 'relative',
        }}
      >
        {/* Top accent rule — full-bleed gradient hairline */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: W,
            height: 4,
            background:
              'linear-gradient(90deg, #8e5cff 0%, #e63e9d 100%)',
            display: 'flex',
          }}
        />

        {/* Brand row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 5,
                height: 32,
                borderRadius: 3,
                background:
                  'linear-gradient(180deg, #8e5cff 0%, #e63e9d 100%)',
                display: 'flex',
              }}
            />
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              DeFi United
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: '#525570',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: isActive ? '#22c55e' : '#9ca3af',
                display: 'flex',
              }}
            />
            {isActive ? 'Live · Coalition' : c.status}
          </div>
        </div>

        {/* Headline block */}
        <div
          style={{
            marginTop: 64,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#7a3fdb',
            }}
          >
            Coordinated relief campaign
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 112,
              fontWeight: 800,
              letterSpacing: '-0.045em',
              lineHeight: 1,
            }}
          >
            {name}
          </div>
        </div>

        {/* Total raised — anchored to the bottom */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 32,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#6e7390',
              }}
            >
              Total raised
            </div>
            <div
              style={{
                marginTop: 2,
                fontSize: 96,
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1,
                color: '#0a0b14',
              }}
            >
              {headline}
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 18,
                fontWeight: 500,
                color: '#6e7390',
              }}
            >
              {supportingLine}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              paddingBottom: 6,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: '-0.015em',
              }}
            >
              defiunited.space
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 13,
                fontWeight: 500,
                color: '#6e7390',
                letterSpacing: '0.04em',
              }}
            >
              Built on Powerhouse
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [
        { name: 'Manrope', data: m500, weight: 500, style: 'normal' },
        { name: 'Manrope', data: m700, weight: 700, style: 'normal' },
        { name: 'Manrope', data: m800, weight: 800, style: 'normal' },
      ],
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=600',
      },
    },
  )
}
