'use client'

import { motion } from 'framer-motion'
import { cn } from '@/modules/shared/lib/cn'

/**
 * Slim progress bar visualization. The hero already prints Pledged / Received
 * / Target in BigStat cards above — this component is just the bar with a
 * tiny legend, so the page doesn't repeat numbers.
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

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="relative h-3 overflow-hidden rounded-full bg-[--color-border-soft]">
          <motion.div
            className={cn(
              'absolute inset-y-0 left-0 rounded-full pulse-ring',
            )}
            style={{
              background:
                'linear-gradient(90deg, #8e5cff 0%, #e63e9d 100%)',
            }}
            initial={false}
            animate={{ width: `${pledgedPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: 'rgba(54, 211, 153, 0.6)',
              boxShadow: '0 0 12px rgba(54, 211, 153, 0.5)',
            }}
            initial={false}
            animate={{ width: `${receivedPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-[--color-ink-soft]">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="size-2 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, #8e5cff 0%, #e63e9d 100%)',
            }}
          />
          Pledged
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full" style={{ background: 'var(--color-success)', opacity: 0.85 }} />
          Received
        </span>
      </div>
    </div>
  )
}
