'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useCampaign } from '@/modules/campaign/use-campaign'
import type { CampaignDetail } from '@/modules/campaign/queries'
import { Thermometer } from './thermometer'
import { CampaignStatusBadge } from './status-badge'
import { ArrowRight, Radio } from 'lucide-react'
import { useToast } from '@/modules/shared/components/toast'
import { cn } from '@/modules/shared/lib/cn'
import { AnimatedNumber } from '@/modules/shared/components/animated-number'
import { formatEthAmount, formatUsdShort } from '@/modules/shared/lib/format'

const POLL_INTERVAL = 5000

function RefreshCountdown() {
  const [seconds, setSeconds] = useState(POLL_INTERVAL / 1000)

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 1 ? POLL_INTERVAL / 1000 : s - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono tabular-nums">
      <span className="text-[--color-ink-soft]">poll</span>{' '}
      <span className="text-[--color-ink-muted]">{seconds}s</span>
    </span>
  )
}

export function CampaignHero({
  slug,
  initial,
}: {
  slug: string
  initial: CampaignDetail
}) {
  const { data, isFetching } = useCampaign(slug, {
    initialData: initial,
    pollMs: POLL_INTERVAL,
  })
  const c = data ?? initial
  const { toast } = useToast()
  const prevReceived = useRef(c.totalReceived)

  useEffect(() => {
    const current = Number(c.totalReceived) || 0
    const previous = Number(prevReceived.current) || 0
    if (current > previous && prevReceived.current !== undefined) {
      const diff = current - previous
      toast({
        title: 'New receipt received',
        message: `${diff >= 1 ? diff.toFixed(2) : diff.toFixed(4)} ETH arrived on-chain`,
        type: 'success',
        duration: 6000,
      })
    }
    prevReceived.current = c.totalReceived
  }, [c.totalReceived, toast])

  const target = Number(c.targetAmount ?? 0) || 0
  const pledged = Number(c.totalPledged) || 0
  const docReceived = Number(c.totalReceived) || 0
  const pendingReceived = Number(c.pendingReceiptsEthEquivalent ?? 0) || 0
  // Headline number: document-derived audit trail + the on-chain pending
  // balance (delta the live overlay can see but the processor hasn't yet
  // recorded as a receipt). Counter ticks the moment a tx confirms.
  const received = docReceived + pendingReceived
  const pledgedPct = target > 0 ? Math.min((pledged / target) * 100, 100) : 0
  const receivedPct = target > 0 ? Math.min((received / target) * 100, 100) : 0
  const usdShort = formatUsdShort(c.headlineTotalUsd)
  const engagementCount = c.onchainEngagement?.totalTransferCount ?? 0
  const uniqueWallets = c.onchainEngagement?.uniqueSenderCount ?? 0
  const incidentDate = c.incidentDate
    ? new Date(c.incidentDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <section className="relative w-full overflow-hidden">
      {/* Animated gradient mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mesh-drift"
        style={{
          background: `
            radial-gradient(900px 480px at 75% -5%, rgba(142, 92, 255, 0.32) 0%, transparent 55%),
            radial-gradient(700px 380px at 18% 12%, rgba(230, 62, 157, 0.22) 0%, transparent 55%),
            radial-gradient(600px 320px at 50% 90%, rgba(91, 194, 231, 0.10) 0%, transparent 60%)
          `,
        }}
      />
      {/* Faint horizon line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(142, 92, 255, 0.5) 50%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 pt-12 pb-12 sm:px-6 sm:pt-20 sm:pb-20">
        {/* Status row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3 text-xs"
        >
          <CampaignStatusBadge status={c.status} />
          <span className="text-[--color-ink-soft]">·</span>
          <span className="inline-flex items-center gap-1.5 text-[--color-ink-soft]">
            <span className="relative flex size-2">
              <span
                className={cn(
                  'absolute inline-flex h-full w-full rounded-full',
                  isFetching ? 'animate-ping' : '',
                )}
                style={{
                  background: isFetching
                    ? 'var(--color-brand)'
                    : 'var(--color-success)',
                  opacity: 0.6,
                }}
              />
              <span
                className="relative inline-flex size-2 rounded-full"
                style={{
                  background: isFetching
                    ? 'var(--color-brand)'
                    : 'var(--color-success)',
                }}
              />
            </span>
            <span className="font-mono">live</span>
            <RefreshCountdown />
          </span>
          {incidentDate ? (
            <>
              <span className="text-[--color-ink-soft]">·</span>
              <span className="text-[--color-ink-soft]">
                Incident{' '}
                <span className="font-mono text-[--color-ink-muted]">{incidentDate}</span>
              </span>
            </>
          ) : null}
        </motion.div>

        {/* Eyebrow — derived from campaign data */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="brand-edge-soft inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-[--color-brand]">
            <Radio className="size-3" />
            DeFi United Coalition
          </span>
          {c.affectedAsset?.symbol ? (
            <span className="brand-edge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[--color-ink-soft] backdrop-blur-sm">
              Affected asset · {c.affectedAsset.symbol}
            </span>
          ) : null}
          <span className="brand-edge inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[--color-ink-soft] backdrop-blur-sm">
            {c.slug}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mb-5 text-center text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          style={{ letterSpacing: '-0.04em' }}
        >
          <span className="gradient-text">{c.name}</span>
        </motion.h1>

        {/* Summary */}
        {c.summary ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-12 max-w-2xl text-balance text-center text-base text-[--color-ink-muted] sm:mb-16 sm:text-lg"
          >
            {c.summary}
          </motion.p>
        ) : null}

        {/* HUGE total raised hero — defiunited.world style */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-[--color-ink-muted]">
            Total raised
          </div>
          {usdShort ? (
            <div
              className="font-bold leading-none tracking-tight text-7xl sm:text-8xl lg:text-[8rem]"
              style={{
                color: 'var(--color-success)',
                letterSpacing: '-0.04em',
                textShadow: '0 0 60px rgba(80, 200, 120, 0.25)',
              }}
            >
              ${usdShort}
            </div>
          ) : null}
          <div
            className={cn(
              'font-mono font-semibold tracking-tight text-[--color-ink-muted]',
              usdShort ? 'mt-3 text-2xl sm:text-3xl' : 'text-5xl sm:text-6xl text-[--color-success]',
            )}
          >
            {formatEthAmount(c.headlineTotalEthEquivalent ?? String(received))} ETH
          </div>
          {engagementCount > 0 ? (
            <div className="brand-edge mt-5 inline-flex items-center gap-4 rounded-full px-4 py-2 text-xs text-[--color-ink-soft] backdrop-blur-sm">
              <span>
                <span className="font-mono font-semibold text-[--color-ink]">
                  {engagementCount.toLocaleString()}
                </span>{' '}
                Transfers
              </span>
              <span className="text-[--color-ink-soft]/60">·</span>
              <span>
                <span className="font-mono font-semibold text-[--color-ink]">
                  {uniqueWallets.toLocaleString()}
                </span>{' '}
                Wallets
              </span>
            </div>
          ) : null}
        </motion.div>

        {/* Supporting stats — pledged / received / target */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-10 max-w-4xl"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3">
            <BigStat
              label="Pledged"
              valueNum={Number(c.totalPledged) || 0}
              unit="ETH"
              percent={pledgedPct}
              tone="brand"
            />
            <BigStat
              label="Received"
              valueNum={received}
              unit="ETH"
              percent={receivedPct}
              tone="success"
            />
            <BigStat
              label="Target"
              valueNum={Number(c.targetAmount) || 0}
              unit="ETH"
              sublabel={`${c.pledgeCount} contributors`}
              tone="neutral"
            />
          </div>
        </motion.div>

        {/* Compact thermometer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto max-w-3xl"
        >
          <Thermometer
            totalPledged={c.totalPledged}
            totalReceived={c.totalReceived}
            targetAmount={c.targetAmount}
            lastUpdateAt={c.lastUpdateAt}
          />
        </motion.div>

        {/* CTA chip — directs to contribute card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm"
        >
          <a
            href="#contribute"
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-white transition"
            style={{
              background: 'linear-gradient(135deg, #8e5cff 0%, #e63e9d 100%)',
              boxShadow: '0 8px 30px -4px rgba(142, 92, 255, 0.55), inset 0 1px 0 0 rgba(255,255,255,0.18)',
            }}
          >
            Contribute
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#dependencies"
            className="brand-edge inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium text-[--color-ink-muted] backdrop-blur-sm transition hover:text-[--color-ink]"
          >
            Track dependencies
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function BigStat({
  label,
  valueNum,
  unit,
  percent,
  sublabel,
  tone,
  emphasis,
}: {
  label: string
  valueNum: number
  unit: string
  percent?: number
  sublabel?: string
  tone: 'brand' | 'success' | 'neutral'
  emphasis?: boolean
}) {
  const accent =
    tone === 'brand'
      ? 'text-[--color-brand]'
      : tone === 'success'
        ? 'text-[--color-success]'
        : 'text-[--color-ink-muted]'

  // Decimal precision matches formatEthAmount's adaptive policy.
  const decimals = valueNum >= 1000 ? 0 : valueNum >= 10 ? 1 : 2

  return (
    <div
      className={cn(
        'glass relative overflow-hidden rounded-2xl px-5 py-5',
        emphasis &&
          'sm:scale-[1.03] sm:-mt-1 sm:shadow-[0_20px_60px_-10px_rgba(142,92,255,0.35)]',
      )}
    >
      {emphasis ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(400px 200px at 100% 0%, rgba(230, 62, 157, 0.15) 0%, transparent 60%)',
          }}
        />
      ) : null}
      <div className="relative">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[--color-ink-soft]">
          <span>{label}</span>
          {percent !== undefined ? (
            <AnimatedNumber
              value={percent}
              decimals={1}
              durationMs={1000}
              format={(n) => `${n.toFixed(1)}%`}
              className={cn('font-mono tabular-nums', accent)}
            />
          ) : null}
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <AnimatedNumber
            value={valueNum}
            decimals={decimals}
            durationMs={1100}
            className={cn(
              'font-mono font-bold tabular-nums tracking-tight',
              emphasis ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl',
              accent,
            )}
          />
          <span className="text-xs font-medium text-[--color-ink-soft]">{unit}</span>
        </div>
        {sublabel ? (
          <div className="mt-1 text-xs text-[--color-ink-soft]">{sublabel}</div>
        ) : null}
      </div>
    </div>
  )
}
