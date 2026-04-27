'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, CardHeader } from '@/modules/shared/components/card'
import { formatEthAmount } from '@/modules/shared/lib/format'
import { Badge } from '@/modules/shared/components/badge'
import { ShieldCheck, HandCoins, TrendingUp } from 'lucide-react'

export function ProgressSection({
  totalPledged,
  totalReceived,
  targetAmount,
  pledgeCount,
}: {
  totalPledged: string
  totalReceived: string
  targetAmount: string | null | undefined
  pledgeCount: number
}) {
  const target = Math.max(Number(targetAmount ?? 0) || 0, 1)
  const pledged = Number(totalPledged) || 0
  const received = Number(totalReceived) || 0

  const pledgedPct = Math.min((pledged / target) * 100, 100)
  const receivedPct = Math.min((received / target) * 100, 100)
  const fulfillmentPct = pledged > 0 ? (received / pledged) * 100 : 0
  const remaining = Math.max(target - pledged, 0)

  const ringCircumference = 2 * Math.PI * 40
  const pledgedOffset = ringCircumference - (pledgedPct / 100) * ringCircumference
  const receivedOffset = ringCircumference - (fulfillmentPct / 100) * ringCircumference

  return (
    <Card>
      <CardHeader
        title="Funding progress"
        description="Breakdown of pledges, on-chain receipts, and fulfillment rate."
        right={<Badge tone="brand">{pledgeCount} pledges</Badge>}
      />
      <CardBody>
        {/* Two progress rings */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
          {/* Pledged ring */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <svg className="size-28 sm:size-32 -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="pledgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8e5cff" />
                    <stop offset="100%" stopColor="#e63e9d" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" className="stroke-[--color-border-soft]" />
                <motion.circle
                  cx="50" cy="50" r="40" fill="none" strokeWidth="8" strokeLinecap="round"
                  stroke="url(#pledgeGradient)"
                  initial={{ strokeDashoffset: ringCircumference }}
                  animate={{ strokeDashoffset: pledgedOffset }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{ strokeDasharray: ringCircumference }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <ShieldCheck className="size-4 sm:size-5 text-[--color-brand]" />
                <span className="mt-0.5 text-base font-bold tabular-nums sm:text-lg">
                  {pledgedPct.toFixed(0)}%
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[--color-ink-soft] sm:text-[10px]">
                  of target
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-medium uppercase tracking-wider text-[--color-ink-soft] sm:text-xs">
                Total pledged
              </div>
              <div className="text-base font-bold tabular-nums sm:text-xl">
                {formatEthAmount(totalPledged)} ETH
              </div>
            </div>
          </div>

          {/* Received ring */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <svg className="size-28 sm:size-32 -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="receivedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#36d399" />
                    <stop offset="100%" stopColor="#5bc2e7" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" className="stroke-[--color-border-soft]" />
                <motion.circle
                  cx="50" cy="50" r="40" fill="none" strokeWidth="8" strokeLinecap="round"
                  stroke="url(#receivedGradient)"
                  initial={{ strokeDashoffset: ringCircumference }}
                  animate={{ strokeDashoffset: receivedOffset }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  style={{ strokeDasharray: ringCircumference }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <HandCoins className="size-4 sm:size-5 text-[--color-success]" />
                <span className="mt-0.5 text-base font-bold tabular-nums sm:text-lg">
                  {fulfillmentPct.toFixed(0)}%
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[--color-ink-soft] sm:text-[10px]">
                  fulfilled
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-medium uppercase tracking-wider text-[--color-ink-soft] sm:text-xs">
                Total received
              </div>
              <div className="text-base font-bold tabular-nums sm:text-xl">
                {formatEthAmount(totalReceived)} ETH
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 sm:my-5 h-px bg-[--color-border-soft]" />

        {/* Bottom: fulfillment bar + stats */}
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-medium text-[--color-ink-muted]">
                <TrendingUp className="size-4 text-[--color-success]" />
                Fulfillment rate
              </span>
              <span className="font-semibold tabular-nums">
                {fulfillmentPct.toFixed(1)}%
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[--color-border-soft]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #36d399 0%, #5bc2e7 100%)' }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(fulfillmentPct, 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            <StatBox label="Target" value={`${formatEthAmount(targetAmount)} ETH`} tone="neutral" />
            <StatBox label="Pledged" value={`${formatEthAmount(totalPledged)} ETH`} tone="brand" />
            <StatBox label="Received" value={`${formatEthAmount(totalReceived)} ETH`} tone="success" />
            <StatBox label="Remaining" value={`${formatEthAmount(String(remaining))} ETH`} tone="warning" />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function StatBox({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: 'neutral' | 'brand' | 'success' | 'warning'
}) {
  const toneBorder: Record<string, string> = {
    neutral: 'border-[--color-border]',
    brand: 'border-[--color-brand]/20',
    success: 'border-[--color-success]/20',
    warning: 'border-[--color-warning]/20',
  }

  const toneText: Record<string, string> = {
    neutral: 'text-[--color-ink-muted]',
    brand: 'text-[--color-brand]',
    success: 'text-[--color-success]',
    warning: 'text-[--color-warning]',
  }

  return (
    <div
      className={`rounded-lg border ${toneBorder[tone]} bg-[--color-surface] p-2.5 text-center shadow-sm sm:p-3`}
    >
      <div className="text-[9px] font-medium uppercase tracking-wider text-[--color-ink-soft] sm:text-[10px]">
        {label}
      </div>
      <div className={`mt-0.5 text-sm font-bold tabular-nums ${toneText[tone]}`}>{value}</div>
    </div>
  )
}
