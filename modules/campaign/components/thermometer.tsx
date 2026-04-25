'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/modules/shared/lib/cn'
import { formatEthAmount } from '@/modules/shared/lib/format'

/**
 * Live thermometer component. Shows pledged total advancing toward target
 * with a separate "received" overlay. Pulses on `lastUpdateAt` change so
 * the page feels alive between polls.
 */
export function Thermometer({
  totalPledged,
  totalReceived,
  targetAmount,
  lastUpdateAt,
}: {
  totalPledged: string
  totalReceived: string
  targetAmount: string | null | undefined
  lastUpdateAt: string | null | undefined
}) {
  const target = Math.max(Number(targetAmount ?? 0) || 0, 1)
  const pledged = Number(totalPledged) || 0
  const received = Number(totalReceived) || 0
  const pledgedPct = Math.min((pledged / target) * 100, 100)
  const receivedPct = Math.min((received / target) * 100, 100)

  const [pulseKey, setPulseKey] = useState(0)
  const lastSeen = useRef<string | null | undefined>(lastUpdateAt)
  useEffect(() => {
    if (lastUpdateAt && lastUpdateAt !== lastSeen.current) {
      lastSeen.current = lastUpdateAt
      setPulseKey((k) => k + 1)
    }
  }, [lastUpdateAt])

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[--color-ink-soft]">
            Pledged
          </div>
          <div
            key={`pledged-${pulseKey}`}
            className="flex items-baseline gap-2 text-4xl font-semibold tabular-nums sm:text-5xl"
          >
            <motion.span
              initial={{ opacity: 0.4, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {formatEthAmount(totalPledged)}
            </motion.span>
            <span className="text-sm font-medium text-[--color-ink-soft]">ETH</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider text-[--color-ink-soft]">
            Target
          </div>
          <div className="text-xl font-semibold tabular-nums">
            {formatEthAmount(targetAmount)}{' '}
            <span className="text-sm font-medium text-[--color-ink-soft]">ETH</span>
          </div>
        </div>
      </div>

      <div className="relative h-3 overflow-hidden rounded-full bg-[--color-border-soft]">
        <motion.div
          key={`bar-${pulseKey}`}
          className={cn(
            'absolute inset-y-0 left-0 rounded-full bg-[--color-brand]',
            'pulse-ring',
          )}
          initial={{ width: 0 }}
          animate={{ width: `${pledgedPct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-[--color-success]"
          initial={{ width: 0 }}
          animate={{ width: `${receivedPct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-[--color-ink-soft]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[--color-brand]" /> Pledged{' '}
            {pledgedPct.toFixed(1)}%
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[--color-success]" /> Received{' '}
            {receivedPct.toFixed(2)}%
          </span>
        </div>
        <span className="tabular-nums">
          {formatEthAmount(totalReceived)} / {formatEthAmount(targetAmount)} ETH
        </span>
      </div>
    </div>
  )
}
