'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Smoothly tweens a numeric value to its target whenever it changes. Uses
 * requestAnimationFrame with an ease-out curve. Falls back to the static
 * target value when the user prefers reduced motion.
 *
 * Format the result via the `format` prop — defaults to en-US thousands
 * separators with optional decimal precision.
 */
export function AnimatedNumber({
  value,
  durationMs = 800,
  decimals = 0,
  format,
  className,
}: {
  value: number | string | null | undefined
  durationMs?: number
  decimals?: number
  format?: (n: number) => string
  className?: string
}) {
  const target = Number(value) || 0
  const [display, setDisplay] = useState<number>(target)
  const previous = useRef<number>(target)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number>(0)
  const fromRef = useRef<number>(target)

  useEffect(() => {
    if (target === previous.current) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      previous.current = target
      setDisplay(target)
      return
    }
    fromRef.current = previous.current
    previous.current = target
    startRef.current = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startRef.current
      const t = Math.min(elapsed / durationMs, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      const next = fromRef.current + (target - fromRef.current) * eased
      setDisplay(next)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = null
      }
    }
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [target, durationMs])

  const formatted = format
    ? format(display)
    : display.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })

  return <span className={className}>{formatted}</span>
}
