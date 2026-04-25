'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { CopyButton } from '@/modules/shared/components/copy-button'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import type { CampaignDetail } from '@/modules/campaign/queries'
import { Badge } from '@/modules/shared/components/badge'

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

  useEffect(() => {
    let cancelled = false
    if (!primary) return
    QRCode.toDataURL(primary.address, {
      width: 220,
      margin: 1,
      color: { dark: '#0a0e1a', light: '#ffffff' },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [primary])

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

  return (
    <Card>
      <CardHeader
        title="Contribution address"
        description="Send ETH or any ERC-20 to this address. All movements are public on-chain."
      />
      <CardBody className="grid grid-cols-1 gap-5 sm:grid-cols-[auto_1fr]">
        <div className="flex justify-center">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="QR code for the contribution address"
              width={180}
              height={180}
              className="rounded-xl border border-[--color-border]"
            />
          ) : (
            <div className="size-[180px] rounded-xl shimmer" />
          )}
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{CHAIN_LABELS[primary.chainId] ?? `chain ${primary.chainId}`}</Badge>
            {primary.label ? <Badge tone="neutral">{primary.label}</Badge> : null}
            {addresses.length > 1 ? (
              <Badge tone="neutral">+{addresses.length - 1} more</Badge>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <code className="block flex-1 break-all rounded-lg bg-[--color-border-soft] px-3 py-2 font-mono text-sm">
              {primary.address}
            </code>
            <CopyButton value={primary.address} label="Copy address" />
          </div>
          <p className="text-xs text-[--color-ink-soft]">
            Pledges marked here will only count once funds are confirmed received
            at this address. Always verify on-chain before sending.
          </p>
        </div>
      </CardBody>
    </Card>
  )
}
