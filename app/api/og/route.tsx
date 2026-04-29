import type { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'
import { OFFLINE_CAMPAIGN } from '@/modules/campaign/offline-fallback'

export const runtime = 'edge'

const W = 1200
const H = 630

async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`
  const css = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(r => r.text())
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype|woff2)'\)/)
  if (!match) throw new Error(`font lookup failed: ${family} ${weight}`)
  const data = await fetch(match[1]).then(r => r.arrayBuffer())
  return data
}

function fmtEth(value: string | undefined): string {
  const n = parseFloat(value ?? '0')
  if (!Number.isFinite(n)) return '0'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, '') + 'k'
  return Math.round(n).toLocaleString('en-US')
}

export async function GET(request: NextRequest) {
  void request.nextUrl.searchParams.get('slug')
  const c = OFFLINE_CAMPAIGN

  const name = c.name
  const summary = (c.summary ?? '').slice(0, 130) + ((c.summary?.length ?? 0) > 130 ? '…' : '')
  const pledged = fmtEth(c.totalPledged)
  const target = fmtEth(c.targetAmount)
  const pledgedNum = parseFloat(c.totalPledged ?? '0')
  const targetNum = parseFloat(c.targetAmount ?? '1')
  const pct = targetNum > 0 ? Math.round((pledgedNum / targetNum) * 100) : 0
  const isActive = c.status === 'ACTIVE'

  const allText = `DeFi United Coalition ${name} ${summary} TOTAL RAISED ${pledged} ETH of ${target} target ${pct}% pledged Live · Active campaign defiunited.space Built on Powerhouse 0123456789·•$,.`

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
          padding: '64px 72px',
          fontFamily: 'Manrope',
          color: '#0a0b14',
          background:
            'linear-gradient(135deg, #fafafe 0%, #efe6fe 45%, #fde6f1 100%)',
          position: 'relative',
        }}
      >
        {/* Soft brand bloom */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              'radial-gradient(closest-side, rgba(230, 62, 157, 0.28), rgba(230, 62, 157, 0))',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -180,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background:
              'radial-gradient(closest-side, rgba(142, 92, 255, 0.30), rgba(142, 92, 255, 0))',
            display: 'flex',
          }}
        />

        {/* Brand: accent rule + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 6,
              height: 36,
              borderRadius: 3,
              background:
                'linear-gradient(180deg, #8e5cff 0%, #e63e9d 100%)',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            DeFi United
          </div>
        </div>

        {/* Status pill */}
        <div
          style={{
            marginTop: 56,
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 18px',
            borderRadius: 999,
            border: '1px solid rgba(142, 92, 255, 0.30)',
            background: 'rgba(255, 255, 255, 0.65)',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: '#7a3fdb',
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
          {isActive ? 'Live · Coalition active' : c.status}
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: 22,
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: '-0.045em',
            lineHeight: 1,
          }}
        >
          {name}
        </div>

        {/* Summary */}
        <div
          style={{
            marginTop: 22,
            fontSize: 24,
            fontWeight: 500,
            color: '#4d5169',
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          {summary}
        </div>

        {/* Footer row: total raised + url */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 13,
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
                marginTop: 6,
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                fontSize: 72,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {pledged}
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: '#6e7390',
                  letterSpacing: '-0.01em',
                }}
              >
                ETH
              </span>
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 16,
                color: '#6e7390',
                fontWeight: 500,
              }}
            >
              {`of ${target} ETH target · ${pct}% pledged`}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
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
                color: '#6e7390',
                letterSpacing: '0.04em',
                fontWeight: 500,
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
