'use client'

import { motion } from 'framer-motion'
import { Activity, Coins, Users } from 'lucide-react'
import type { CampaignDetail } from '@/modules/campaign/queries'
import { AnimatedNumber } from '@/modules/shared/components/animated-number'

/**
 * "Treasury at a glance" strip surfacing the live on-chain reality of the
 * campaign treasury directly below the hero — separate from the
 * audit-trail "Received" stat which lags the chain.
 *
 *   - balance: real `balanceOf` overlay summed in ETH-equivalent
 *   - tx count: number of indexed receipt documents (excluding REORGED)
 *   - unique wallets: distinct fromAddress values across those receipts
 */
export function TreasuryGlance({ campaign }: { campaign: CampaignDetail }) {
  const live = campaign.onchainLiveBalance
  const liveTotal = Number(live?.totalEthEquivalent ?? 0)
  const ethPriceUsd = Number(live?.ethPriceUsd ?? 0)
  const usdEquiv = liveTotal * ethPriceUsd

  const receipts = (campaign.recentReceipts ?? []).filter(
    (r) => r.reconciliationStatus !== 'REORGED',
  )
  const txCount = receipts.length
  const uniqueWallets = new Set(
    receipts.map((r) => r.fromAddress?.toLowerCase()).filter(Boolean),
  ).size

  const perAsset = live?.perAsset ?? []

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass relative overflow-hidden rounded-2xl px-5 py-4 sm:px-6 sm:py-5"
          style={{
            background:
              'linear-gradient(135deg, rgba(142,92,255,0.06), rgba(230,62,157,0.04))',
            borderColor: 'var(--color-border)',
          }}
        >
          {/* Aurora highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(700px 200px at 100% 0%, rgba(91,194,231,0.12), transparent 60%)',
            }}
          />

          <div className="relative grid grid-cols-1 items-start gap-5 sm:grid-cols-3 sm:gap-6">
            {/* Live treasury balance */}
            <div className="flex items-start gap-3">
              <div
                className="grid size-9 shrink-0 place-items-center rounded-xl"
                style={{ background: 'var(--color-brand-soft)' }}
              >
                <Coins className="size-4 text-[--color-brand]" />
              </div>
              <div className="min-w-0">
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
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <AnimatedNumber
                    value={liveTotal}
                    decimals={liveTotal >= 100 ? 2 : 4}
                    durationMs={900}
                    className="font-mono text-2xl font-bold tabular-nums tracking-tight text-[--color-ink] sm:text-3xl"
                  />
                  <span className="text-xs font-medium text-[--color-ink-soft]">
                    ETH
                  </span>
                </div>
                {usdEquiv > 0 ? (
                  <div className="mt-0.5 text-xs text-[--color-ink-soft]">
                    ≈ ${' '}
                    <AnimatedNumber
                      value={usdEquiv}
                      decimals={0}
                      durationMs={900}
                      format={(n) => n.toLocaleString('en-US')}
                      className="font-mono tabular-nums"
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {/* Tx count */}
            <div className="flex items-start gap-3">
              <div
                className="grid size-9 shrink-0 place-items-center rounded-xl"
                style={{ background: 'var(--color-brand-soft)' }}
              >
                <Activity className="size-4 text-[--color-brand]" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[--color-ink-soft]">
                  Inbound transfers
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <AnimatedNumber
                    value={txCount}
                    decimals={0}
                    durationMs={700}
                    className="font-mono text-2xl font-bold tabular-nums tracking-tight text-[--color-ink] sm:text-3xl"
                  />
                  <span className="text-xs font-medium text-[--color-ink-soft]">
                    txs
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-[--color-ink-soft]">
                  Indexed on-chain
                </div>
              </div>
            </div>

            {/* Unique wallets */}
            <div className="flex items-start gap-3">
              <div
                className="grid size-9 shrink-0 place-items-center rounded-xl"
                style={{ background: 'var(--color-brand-soft)' }}
              >
                <Users className="size-4 text-[--color-brand]" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[--color-ink-soft]">
                  Unique wallets
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <AnimatedNumber
                    value={uniqueWallets}
                    decimals={0}
                    durationMs={700}
                    className="font-mono text-2xl font-bold tabular-nums tracking-tight text-[--color-ink] sm:text-3xl"
                  />
                  <span className="text-xs font-medium text-[--color-ink-soft]">
                    senders
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-[--color-ink-soft]">
                  Distinct contributors
                </div>
              </div>
            </div>
          </div>

          {/* Per-asset breakdown — keeps the headline ETH number honest */}
          {perAsset.length > 0 && liveTotal > 0 ? (
            <div className="relative mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[--color-border-soft] pt-3 text-[11px] text-[--color-ink-soft]">
              <span className="font-mono uppercase tracking-[0.12em] text-[10px]">
                Holdings:
              </span>
              {perAsset.map((a) => {
                const amount = Number(a.formattedAmount)
                if (amount <= 0.0001) return null
                return (
                  <span
                    key={a.symbol}
                    className="inline-flex items-center gap-1 font-mono tabular-nums"
                  >
                    <span className="font-semibold text-[--color-ink]">
                      {a.symbol}
                    </span>
                    <span>
                      {amount >= 1000
                        ? amount.toLocaleString('en-US', {
                            maximumFractionDigits: 0,
                          })
                        : amount >= 1
                          ? amount.toFixed(2)
                          : amount.toFixed(4)}
                    </span>
                  </span>
                )
              })}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
