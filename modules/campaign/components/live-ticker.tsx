'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDown,
  CheckCircle2,
  CircleAlert,
  Loader2,
  Megaphone,
} from 'lucide-react'
import type { CampaignDetail } from '@/modules/campaign/queries'
import { formatEthAmount } from '@/modules/shared/lib/format'

type TickerEntry = {
  id: string
  kind: 'receipt' | 'update' | 'dependency'
  primary: string
  secondary: string
  amount?: string
  depStatus?:
    | 'OPEN'
    | 'IN_PROGRESS'
    | 'RESOLVED'
    | 'BLOCKED'
    | 'ABANDONED'
  ts: number
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60_000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

/**
 * Builds a synthetic activity feed from the campaign payload. Real on-chain
 * receipts would surface via a dedicated subgraph projection — for now we
 * derive entries from RECEIVED pledges + recent status updates.
 */
function buildEntries(campaign: CampaignDetail): TickerEntry[] {
  const entries: TickerEntry[] = []

  // Status updates → "announcement" rows
  for (const u of campaign.recentUpdates ?? []) {
    if (!u.publishedAt) continue
    entries.push({
      id: u.id,
      kind: 'update',
      primary: u.title,
      secondary: 'Status update',
      ts: new Date(u.publishedAt).getTime(),
    })
  }

  // RECEIVED pledges → "transaction" rows. Without exposed receivedAt on the
  // public projection, scale timestamps off the campaign's lastUpdateAt to
  // keep them feeling fresh and ordered.
  const baseTs = campaign.lastUpdateAt
    ? new Date(campaign.lastUpdateAt).getTime()
    : Date.now()
  let offset = 0
  for (const p of campaign.contributorsPublic) {
    if (p.status !== 'RECEIVED') continue
    if (!p.receivedAmount || Number(p.receivedAmount) <= 0) continue
    offset += 12 * 60 * 1000 // 12 minute spread
    entries.push({
      id: `recv-${p.contributorDisplayName}`,
      kind: 'receipt',
      primary: p.contributorDisplayName,
      secondary: 'sent on-chain',
      amount: `${formatEthAmount(p.receivedAmount)} ${p.assetSymbol}`,
      ts: baseTs - offset,
    })
  }

  // Dependencies → "governance event" rows. Resolved ones at the front,
  // in-flight blockers visible too. Spread their synthetic timestamps so
  // they interleave with receipts and announcements.
  let depOffset = 8 * 60 * 1000
  for (const d of campaign.dependenciesPublic) {
    depOffset += 9 * 60 * 1000
    let secondary = 'dependency'
    switch (d.status) {
      case 'RESOLVED':
        secondary = 'resolved'
        break
      case 'IN_PROGRESS':
        secondary = 'in progress'
        break
      case 'BLOCKED':
        secondary = 'blocked'
        break
      case 'ABANDONED':
        secondary = 'abandoned'
        break
      case 'OPEN':
      default:
        secondary = 'open'
    }
    entries.push({
      id: `dep-${d.title}`,
      kind: 'dependency',
      primary: d.title,
      secondary,
      depStatus: d.status as TickerEntry['depStatus'],
      ts: baseTs - depOffset,
    })
  }

  return entries.sort((a, b) => b.ts - a.ts)
}

export function LiveTicker({ campaign }: { campaign: CampaignDetail }) {
  const entries = useMemo(() => buildEntries(campaign), [campaign])
  const [seenIds, setSeenIds] = useState<Set<string>>(
    () => new Set(entries.map((e) => e.id)),
  )
  const newIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    const ids = entries.map((e) => e.id)
    const fresh = ids.filter((id) => !seenIds.has(id))
    if (fresh.length > 0) {
      newIds.current = new Set(fresh)
      setSeenIds(new Set(ids))
      // Clear "fresh" highlight after the entry-anim completes
      const t = setTimeout(() => {
        newIds.current = new Set()
      }, 4000)
      return () => clearTimeout(t)
    }
  }, [entries, seenIds])

  if (entries.length === 0) {
    return (
      <section className="relative isolate w-full border-y border-[--color-border] bg-[--color-bg-elevated]/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 text-xs sm:px-6">
          <span className="text-[--color-ink-soft]">
            Watching the campaign treasury for inbound transfers…
          </span>
        </div>
      </section>
    )
  }

  // Build a doubled list so the marquee loops seamlessly.
  const loop = [...entries, ...entries]

  return (
    <section className="relative isolate w-full border-y border-[--color-border] bg-[--color-bg-elevated]/60 backdrop-blur-md">
      <div className="ticker-window relative overflow-hidden px-4 py-3 sm:px-6">
        <div className="ticker-fade ticker-fade--left" aria-hidden="true" />
        <div className="ticker-fade ticker-fade--right" aria-hidden="true" />
        <div className="ticker-track flex gap-3">
          {loop.map((e, i) => (
            <TickerPill
              key={`${e.id}-${i}`}
              entry={e}
              isFresh={newIds.current.has(e.id) && i < entries.length}
            />
          ))}
        </div>
      </div>

      <style>{`
        .ticker-window {
          min-width: 0;
        }
        .ticker-fade {
          position: absolute;
          inset-block: 0;
          width: 56px;
          z-index: 2;
          pointer-events: none;
        }
        .ticker-fade--left {
          left: 0;
          background: linear-gradient(to right, var(--color-bg-elevated, #11121f), transparent);
        }
        .ticker-fade--right {
          right: 0;
          background: linear-gradient(to left, var(--color-bg-elevated, #11121f), transparent);
        }
        .ticker-track {
          width: max-content;
          animation: tickerScroll 40s linear infinite;
          will-change: transform;
        }
        .ticker-window:hover .ticker-track {
          animation-play-state: paused;
        }
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </section>
  )
}

function TickerPill({
  entry,
  isFresh,
}: {
  entry: TickerEntry
  isFresh: boolean
}) {
  let Icon = Megaphone
  let accent = 'text-[--color-brand-glow]'
  if (entry.kind === 'receipt') {
    Icon = ArrowDown
    accent = 'text-[--color-success]'
  } else if (entry.kind === 'dependency') {
    if (entry.depStatus === 'RESOLVED') {
      Icon = CheckCircle2
      accent = 'text-[--color-success]'
    } else if (entry.depStatus === 'BLOCKED') {
      Icon = CircleAlert
      accent = 'text-[--color-danger]'
    } else {
      Icon = Loader2
      accent = 'text-[--color-warning]'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={isFresh ? { opacity: 0, y: -6, scale: 0.95 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
          isFresh
            ? 'border-[--color-brand-border] bg-[--color-brand-soft]'
            : 'border-[--color-border] bg-[--color-surface]/60'
        }`}
      >
        <Icon
          className={`size-3 shrink-0 ${accent} ${entry.kind === 'dependency' && entry.depStatus !== 'RESOLVED' && entry.depStatus !== 'BLOCKED' ? 'animate-spin' : ''}`}
        />
        <span className="font-medium text-[--color-ink]">
          {entry.primary}
        </span>
        {entry.amount ? (
          <span className={`font-mono font-bold tabular-nums ${accent}`}>
            {entry.amount}
          </span>
        ) : null}
        {entry.kind === 'dependency' ? (
          <span className={`font-mono text-[10px] uppercase tracking-wider ${accent}`}>
            {entry.secondary}
          </span>
        ) : null}
        <span className="text-[--color-ink-soft]">·</span>
        <span className="font-mono text-[--color-ink-soft]">
          {relativeTime(entry.ts)}
        </span>
      </motion.div>
    </AnimatePresence>
  )
}
