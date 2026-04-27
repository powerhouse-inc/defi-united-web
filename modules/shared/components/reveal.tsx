'use client'

import { type ReactNode, useMemo } from 'react'
import { motion } from 'framer-motion'

// Default fast path — built once at module scope so it never re-creates
// on render. CRITICAL: motion.create() returns a fresh React component
// each call; calling it inside Reveal's body remounted the entire subtree
// every render, replaying the entrance animation on every poll cycle and
// making live updates look like a full page refresh.
const MotionDiv = motion.create('div')

export function Reveal({
  children,
  delay = 0,
  viewOnce = true,
  as,
}: {
  children: ReactNode
  delay?: number
  viewOnce?: boolean
  as?: React.ElementType
}) {
  const Motion = useMemo(
    () => (as ? motion.create(as) : MotionDiv),
    [as],
  )
  return (
    <Motion
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: viewOnce, amount: 0.15 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Motion>
  )
}

export const PLEDGE_ROW_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.03, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
}
