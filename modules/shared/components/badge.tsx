import { cn } from '@/modules/shared/lib/cn'

type Tone =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'brand'
  | 'accent'

/**
 * All tones use the brand gradient stroke (.brand-edge*) so badges
 * read as the same family of pills. Tone is conveyed by text colour
 * and the soft-tinted padding-box fill, not by a separately-coloured
 * border.
 */
const toneClass: Record<Tone, string> = {
  neutral: 'brand-edge text-[--color-ink-muted]',
  success: 'brand-edge-tone tone-success text-[--color-success]',
  warning: 'brand-edge-tone tone-warning text-[--color-warning]',
  info: 'brand-edge-tone tone-info text-[--color-info]',
  danger: 'brand-edge-tone tone-danger text-[--color-danger]',
  brand: 'brand-edge-soft text-[--color-brand]',
  accent: 'brand-edge-accent text-[--color-accent]',
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
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium tracking-tight',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
