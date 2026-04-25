'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/modules/shared/lib/cn'

export function CopyButton({
  value,
  className,
  label = 'Copy',
}: {
  value: string
  className?: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }
  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border border-[--color-border] bg-white px-2.5 py-1.5 text-xs font-medium text-[--color-ink-muted] hover:bg-[--color-border-soft]',
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-[--color-success]" /> Copied
        </>
      ) : (
        <>
          <Copy className="size-3.5" /> {label}
        </>
      )}
    </button>
  )
}
