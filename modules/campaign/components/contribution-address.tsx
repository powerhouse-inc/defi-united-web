'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { CopyButton } from '@/modules/shared/components/copy-button'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import type { CampaignDetail } from '@/modules/campaign/queries'
import { Badge } from '@/modules/shared/components/badge'
import { shortenAddress } from '@/modules/shared/lib/format'
import { useTheme } from '@/modules/shared/providers/theme-provider'
import { ExternalLink, QrCode, ShieldCheck, Zap } from 'lucide-react'

const CHAIN_LABELS: Record<number, string> = {
  1: 'Ethereum',
  10: 'OP Mainnet',
  137: 'Polygon',
  42161: 'Arbitrum',
  8453: 'Base',
}

export function ContributionAddressCard({
  addresses,
}: {
  addresses: CampaignDetail['contributionAddresses']
}) {
  const primary = addresses[0]
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

  return (
    <Card className="border-[--color-brand-border]/40">
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
                <code className="brand-edge flex-1 truncate rounded-lg px-3 py-2.5 font-mono text-xs text-[--color-ink] sm:text-sm">
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
    <div className="brand-edge flex items-start gap-2.5 rounded-xl px-3 py-2.5">
      <span className="brand-edge-soft mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-[--color-brand-glow]">
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
