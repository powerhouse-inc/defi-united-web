'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { CopyButton } from '@/modules/shared/components/copy-button'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import type { CampaignDetail } from '@/modules/campaign/queries'
import { Badge } from '@/modules/shared/components/badge'
import { shortenAddress } from '@/modules/shared/lib/format'
import { useTheme } from '@/modules/shared/providers/theme-provider'
import { Activity, ExternalLink, QrCode, ShieldCheck, Users, Zap } from 'lucide-react'
import { AnimatedNumber } from '@/modules/shared/components/animated-number'

const CHAIN_LABELS: Record<number, string> = {
  1: 'Ethereum',
  10: 'OP Mainnet',
  137: 'Polygon',
  42161: 'Arbitrum',
  8453: 'Base',
}

export function ContributionAddressCard({
  campaign,
}: {
  campaign: CampaignDetail
}) {
  const primary = campaign.contributionAddresses[0]
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [theme] = useTheme()

  useEffect(() => {
    let cancelled = false
    if (!primary) return
    // QR module ("dark") and quiet zone ("light") colors flip with theme
    // so the code reads against either background.
    const dark = theme === 'dark' ? '#ECEDF7' : '#0a0a14'
    const light = theme === 'dark' ? '#0a0a14' : '#FFFFFF'
    QRCode.toDataURL(primary.address, {
      width: 200,
      margin: 2,
      color: { dark, light },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [primary, theme])

  if (!primary) {
    return (
      <Card>
        <CardHeader title="Contribution address" />
        <CardBody>
          <p className="text-sm text-[--color-ink-soft]">
            No contribution address has been published yet.
          </p>
        </CardBody>
      </Card>
    )
  }

  const explorerUrl = `https://etherscan.io/address/${primary.address}`
  const txsUrl = `${explorerUrl}#transactions`
  const chainLabel = CHAIN_LABELS[primary.chainId] ?? `Chain ${primary.chainId}`

  // Live on-chain stats — sourced from the public-campaign overlay so
  // the contribute card surfaces what's actually in the treasury right
  // now alongside the address operators are about to send to.
  const liveTotal = Number(campaign.onchainLiveBalance?.totalEthEquivalent ?? 0)
  const ethPriceUsd = Number(campaign.onchainLiveBalance?.ethPriceUsd ?? 0)
  const usdEquiv = liveTotal * ethPriceUsd
  const receipts = (campaign.recentReceipts ?? []).filter(
    (r) => r.reconciliationStatus !== 'REORGED',
  )
  const txCount = receipts.length
  const uniqueWallets = new Set(
    receipts.map((r) => r.fromAddress?.toLowerCase()).filter(Boolean),
  ).size

  return (
    <Card variant="accent">
      <CardHeader
        title="Contribute"
        description="Send ETH or stablecoins to the verified treasury address."
        right={<Badge tone="brand">{chainLabel}</Badge>}
      />
      <CardBody className="p-5 sm:p-7">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr] lg:gap-8 lg:items-center">
          {/* QR — fixed width left column */}
          <div className="flex justify-center lg:justify-start">
            <div
              className="relative rounded-2xl p-[2px]"
              style={{
                background:
                  'linear-gradient(135deg, rgba(142,92,255,0.7) 0%, rgba(230,62,157,0.7) 100%)',
                boxShadow:
                  '0 16px 50px -16px rgba(142,92,255,0.5), 0 8px 24px -8px rgba(230,62,157,0.35)',
              }}
            >
              <div className="rounded-2xl bg-[--color-bg-elevated] p-3">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="QR code for contribution address"
                    width={180}
                    height={180}
                    className="block h-[180px] w-[180px] rounded-xl"
                  />
                ) : (
                  <div className="grid h-[180px] w-[180px] place-items-center rounded-xl shimmer">
                    <QrCode className="size-8 text-[--color-ink-soft]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column — address + meta */}
          <div className="flex min-w-0 flex-col gap-4">
            {/* Address block */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[--color-ink-soft]">
                Treasury address
              </div>
              <div className="mt-2 flex items-center gap-2">
                <code className="flex-1 truncate rounded-lg border border-[--color-border] bg-[--color-bg-elevated]/60 px-3 py-2.5 font-mono text-xs text-[--color-ink] sm:text-sm">
                  {primary.address}
                </code>
                <CopyButton value={primary.address} label="Copy" />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[--color-brand-glow] transition-colors hover:text-[--color-accent] hover:underline"
                >
                  Etherscan <ExternalLink className="size-2.5" />
                </a>
                <a
                  href={txsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[--color-brand-glow] transition-colors hover:text-[--color-accent] hover:underline"
                >
                  Transactions <ExternalLink className="size-2.5" />
                </a>
                <span className="ml-auto font-mono text-[--color-ink-soft]">
                  {shortenAddress(primary.address)}
                </span>
              </div>
            </div>

            {/* Live treasury snapshot */}
            {liveTotal > 0 ? (
              <div
                className="relative overflow-hidden rounded-xl border border-[--color-brand-border] px-4 py-3"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(142,92,255,0.08), rgba(230,62,157,0.05))',
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{
                    background:
                      'radial-gradient(500px 140px at 100% 0%, rgba(91,194,231,0.12), transparent 60%)',
                  }}
                />
                <div className="relative grid grid-cols-3 items-center gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[--color-ink-soft]">
                      <span className="relative flex size-1.5">
                        <span
                          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                          style={{ background: 'var(--color-success)' }}
                        />
                        <span
                          className="relative inline-flex size-1.5 rounded-full"
                          style={{ background: 'var(--color-success)' }}
                        />
                      </span>
                      Treasury · live
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <AnimatedNumber
                        value={liveTotal}
                        decimals={liveTotal >= 100 ? 2 : 4}
                        durationMs={800}
                        className="font-mono text-xl font-bold tabular-nums tracking-tight text-[--color-ink]"
                      />
                      <span className="text-[10px] font-medium text-[--color-ink-soft]">
                        ETH
                      </span>
                    </div>
                    {usdEquiv > 0 ? (
                      <div className="text-[10px] font-mono tabular-nums text-[--color-ink-soft]">
                        ≈ ${' '}
                        <AnimatedNumber
                          value={usdEquiv}
                          decimals={0}
                          durationMs={800}
                          format={(n) => n.toLocaleString('en-US')}
                          className="font-mono"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[--color-ink-soft]">
                      <Activity className="size-2.5" />
                      Inbound
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <AnimatedNumber
                        value={txCount}
                        decimals={0}
                        durationMs={600}
                        className="font-mono text-xl font-bold tabular-nums tracking-tight text-[--color-ink]"
                      />
                      <span className="text-[10px] font-medium text-[--color-ink-soft]">
                        txs
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[--color-ink-soft]">
                      <Users className="size-2.5" />
                      Senders
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <AnimatedNumber
                        value={uniqueWallets}
                        decimals={0}
                        durationMs={600}
                        className="font-mono text-xl font-bold tabular-nums tracking-tight text-[--color-ink]"
                      />
                      <span className="text-[10px] font-medium text-[--color-ink-soft]">
                        wallets
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Trust signals */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <TrustSignal
                icon={Zap}
                title="ETH and stablecoins"
                body="USDC · USDT · DAI · ETH on Ethereum Mainnet"
              />
              <TrustSignal
                icon={ShieldCheck}
                title="Auto-reconciled"
                body="Each receipt is matched to its pledge by the campaign processor — fully on-chain, fully verifiable."
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function TrustSignal({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType
  title: string
  body: string
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-[--color-border-soft] bg-[--color-bg-elevated]/40 px-3 py-2.5">
      <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-[--color-brand-border] bg-[--color-brand-soft] text-[--color-brand-glow]">
        <Icon className="size-3.5" />
      </span>
      <div className="min-w-0">
        <div className="text-xs font-semibold tracking-tight text-[--color-ink]">
          {title}
        </div>
        <div className="mt-0.5 text-[11px] leading-relaxed text-[--color-ink-soft]">
          {body}
        </div>
      </div>
    </div>
  )
}
