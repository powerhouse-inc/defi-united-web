import { cn } from '@/modules/shared/lib/cn'

type Tone =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'brand'

const toneClass: Record<Tone, string> = {
  neutral: 'bg-[--color-border-soft] text-[--color-ink-muted] border-[--color-border]',
  success: 'bg-[--color-success-soft] text-[--color-success] border-green-200',
  warning: 'bg-[--color-warning-soft] text-[--color-warning] border-amber-200',
  info: 'bg-[--color-info-soft] text-[--color-info] border-sky-200',
  danger: 'bg-red-50 text-[--color-danger] border-red-200',
  brand: 'bg-[--color-brand-soft] text-[--color-brand] border-indigo-200',
}

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
