import { cn } from '@/modules/shared/lib/cn'

type Tone =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'brand'
  | 'accent'

const toneClass: Record<Tone, string> = {
  neutral:
    'bg-[--color-border-soft] text-[--color-ink-muted] border-[--color-border]',
  success:
    'bg-[--color-success-soft] text-[--color-success] border-[--color-success-border]',
  warning:
    'bg-[--color-warning-soft] text-[--color-warning] border-[--color-warning-border]',
  info: 'bg-[--color-info-soft] text-[--color-info] border-[--color-info-border]',
  danger:
    'bg-[--color-danger-soft] text-[--color-danger] border-[--color-danger-border]',
  brand:
    'bg-[--color-brand-soft] text-[--color-brand] border-[--color-brand-border]',
  accent:
    'bg-[--color-accent-soft] text-[--color-accent] border-[color:rgba(230,62,157,0.3)]',
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
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-tight',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
