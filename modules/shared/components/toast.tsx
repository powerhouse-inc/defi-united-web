'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, CheckCircle, AlertTriangle } from 'lucide-react'
import { cn } from '@/modules/shared/lib/cn'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ToastType = 'info' | 'success' | 'warning'

export interface ToastOptions {
  title: string
  message?: string
  type?: ToastType
  duration?: number // ms; default 6000
}

export interface Toast extends ToastOptions {
  id: string
  type: ToastType
  duration: number
}

interface ToastContextValue {
  toasts: Toast[]
  toast: (options: ToastOptions) => void
  dismiss: (id: string) => void
}

// ---------------------------------------------------------------------------
// Context + Hook
// ---------------------------------------------------------------------------

export const ToastContext = React.createContext<ToastContextValue>({
  toasts: [],
  toast: () => {},
  dismiss: () => {},
})

export function useToast(): ToastContextValue {
  return React.useContext(ToastContext)
}

// ---------------------------------------------------------------------------
// Toaster (renders at bottom-right)
// ---------------------------------------------------------------------------

const TYPE_BORDER: Record<ToastType, string> = {
  info: 'border-l-[--color-info]',
  success: 'border-l-[--color-success]',
  warning: 'border-l-[--color-warning]',
}

const TYPE_ICONS: Record<ToastType, React.ElementType> = {
  info: Bell,
  success: CheckCircle,
  warning: AlertTriangle,
}

const TYPE_ICON_COLORS: Record<ToastType, string> = {
  info: 'text-[--color-info]',
  success: 'text-[--color-success]',
  warning: 'text-[--color-warning]',
}

const TYPE_GLOW: Record<ToastType, string> = {
  info: '0 12px 36px -10px rgba(91,194,231,0.45)',
  success: '0 12px 36px -10px rgba(54,211,153,0.45)',
  warning: '0 12px 36px -10px rgba(245,181,68,0.45)',
}

const MAX_TOASTS = 3

export function Toaster() {
  const { toasts, dismiss } = React.useContext(ToastContext)
  const visible = toasts.slice(-MAX_TOASTS)

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence>
        {visible.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Individual toast item
// ---------------------------------------------------------------------------

function ToastItem({
  toast: t,
  onDismiss,
}: {
  toast: Toast
  onDismiss: () => void
}) {
  const Icon = TYPE_ICONS[t.type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      role="alert"
      className="pointer-events-auto cursor-pointer"
      onClick={onDismiss}
    >
      <div
        className={cn(
          'flex items-start gap-3 rounded-xl border border-l-4 border-[--color-border] bg-[--color-surface] p-3 backdrop-blur-md',
          TYPE_BORDER[t.type],
        )}
        style={{ boxShadow: TYPE_GLOW[t.type] }}
      >
        <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', TYPE_ICON_COLORS[t.type])} />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-[--color-ink]">{t.title}</div>
          {t.message ? (
            <div className="mt-0.5 text-xs text-[--color-ink-muted]">{t.message}</div>
          ) : null}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDismiss()
          }}
          aria-label="Dismiss"
          className="shrink-0 text-[--color-ink-muted] hover:text-[--color-ink]"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  )
}
