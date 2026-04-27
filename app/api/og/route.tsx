import { NextRequest } from 'next/server'
import { OFFLINE_CAMPAIGN } from '@/modules/campaign/offline-fallback'

export const runtime = 'edge'

function formatEth(value: string): string {
  const n = parseFloat(value)
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, '') + 'k'
  return n.toString()
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function buildSvg(campaign: typeof OFFLINE_CAMPAIGN): string {
  const pledged = parseFloat(campaign.totalPledged ?? '0')
  const received = parseFloat(campaign.totalReceived ?? '0')
  const target = parseFloat(campaign.targetAmount ?? '1')
  const pct = target > 0 ? Math.round((pledged / target) * 100) : 0
  const barWidth = Math.round((pct / 100) * 780)
  const receivedWidth = Math.round(((received / target) * 100 / 100) * 780)

  const name = escapeXml(campaign.name)
  const summaryText = escapeXml((campaign.summary ?? '').slice(0, 130))
  const summarySuffix = (campaign.summary?.length ?? 0) > 130 ? '…' : ''

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#f7f8fb"/>
      <stop offset="100%" stop-color="#eaeefe"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2742f5"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="recv" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#16a34a"/>
      <stop offset="100%" stop-color="#4ade80"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)" rx="0"/>

  <rect x="0" y="0" width="1200" height="6" fill="#2742f5"/>

  <rect x="60" y="38" width="40" height="40" rx="10" fill="#2742f5"/>
  <text x="80" y="65" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="14" font-weight="700">DU</text>
  <text x="115" y="62" fill="#0a0e1a" font-family="system-ui,sans-serif" font-size="17" font-weight="600">DeFi United</text>

  <text x="60" y="130" fill="#0a0e1a" font-family="system-ui,sans-serif" font-size="52" font-weight="700">${name}</text>
  <text x="60" y="175" fill="#4a5568" font-family="system-ui,sans-serif" font-size="20">${summaryText}${summarySuffix}</text>

  <text x="60" y="270" fill="#6b7280" font-family="system-ui,sans-serif" font-size="13" font-weight="500" text-transform="uppercase">PLEDGED</text>
  <text x="60" y="330" fill="#0a0e1a" font-family="system-ui,sans-serif" font-size="64" font-weight="700">${formatEth(campaign.totalPledged ?? '0')}<tspan fill="#6b7280" font-size="32" font-weight="500"> ETH</tspan></text>

  <text x="520" y="310" fill="#4a5568" font-family="system-ui,sans-serif" font-size="20">of ${formatEth(campaign.targetAmount ?? '0')} ETH target</text>

  <rect x="60" y="370" width="780" height="20" rx="10" fill="#e5e7eb"/>
  <rect x="60" y="370" width="${receivedWidth}" height="20" rx="10" fill="url(#recv)" opacity="0.4"/>
  <rect x="60" y="370" width="${barWidth}" height="20" rx="10" fill="url(#bar)"/>

  <text x="855" y="393" fill="#2742f5" font-family="system-ui,sans-serif" font-size="24" font-weight="700">${pct}%</text>

  <g transform="translate(60, 440)">
    <rect x="0" y="0" width="170" height="72" rx="12" fill="#eaeefe" stroke="#2742f5" stroke-width="1" stroke-opacity="0.2"/>
    <text x="16" y="28" fill="#6b7280" font-family="system-ui,sans-serif" font-size="11" font-weight="500">CONTRIBUTORS</text>
    <text x="16" y="56" fill="#2742f5" font-family="system-ui,sans-serif" font-size="28" font-weight="700">${campaign.pledgeCount}</text>
  </g>

  <g transform="translate(250, 440)">
    <rect x="0" y="0" width="170" height="72" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="1" stroke-opacity="0.2"/>
    <text x="16" y="28" fill="#6b7280" font-family="system-ui,sans-serif" font-size="11" font-weight="500">RECEIVED</text>
    <text x="16" y="56" fill="#16a34a" font-family="system-ui,sans-serif" font-size="28" font-weight="700">${formatEth(campaign.totalReceived ?? '0')}<tspan fill="#6b7280" font-size="16" font-weight="500"> ETH</tspan></text>
  </g>

  <g transform="translate(440, 440)">
    <rect x="0" y="0" width="170" height="72" rx="12" fill="#fef3c7" stroke="#d97706" stroke-width="1" stroke-opacity="0.2"/>
    <text x="16" y="28" fill="#6b7280" font-family="system-ui,sans-serif" font-size="11" font-weight="500">DEPENDENCIES</text>
    <text x="16" y="56" fill="#d97706" font-family="system-ui,sans-serif" font-size="28" font-weight="700">${campaign.dependenciesResolved}/${(campaign.dependenciesBlocking ?? 0) + campaign.dependenciesResolved}</text>
  </g>

  <g transform="translate(630, 440)">
    <rect x="0" y="0" width="210" height="72" rx="12" fill="#e5e7eb" stroke="#d1d5db" stroke-width="1"/>
    <text x="16" y="28" fill="#6b7280" font-family="system-ui,sans-serif" font-size="11" font-weight="500">STATUS</text>
    <text x="16" y="56" fill="#0a0e1a" font-family="system-ui,sans-serif" font-size="28" font-weight="700">${campaign.status === 'ACTIVE' ? '● Live' : campaign.status}</text>
  </g>

  <text x="60" y="570" fill="#9ca3af" font-family="system-ui,sans-serif" font-size="14">defiunited.xyz</text>
  <text x="1140" y="570" text-anchor="end" fill="#9ca3af" font-family="system-ui,sans-serif" font-size="14">Powered by Powerhouse</text>
</svg>`
}

function resolveCampaign(slug: string | null | undefined) {
  void slug
  return OFFLINE_CAMPAIGN
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  const campaign = resolveCampaign(slug)
  const svg = buildSvg(campaign)

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=60, s-maxage=300',
    },
  })
}
