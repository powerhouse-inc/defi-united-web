'use client'

import * as React from 'react'
import type { Toast, ToastOptions } from '@/modules/shared/components/toast'
import { ToastContext, Toaster } from '@/modules/shared/components/toast'

const DEFAULT_DURATION = 6000

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((options: ToastOptions) => {
    const newToast: Toast = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: options.title,
      message: options.message,
      type: options.type ?? 'info',
      duration: options.duration ?? DEFAULT_DURATION,
    }

    setToasts((prev) => [...prev, newToast])

    // Auto-dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
    }, newToast.duration)
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}
