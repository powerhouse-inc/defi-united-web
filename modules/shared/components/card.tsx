import { cn } from '@/modules/shared/lib/cn'

/**
 * Surface tier system. Two primitives, one rule:
 * - `section` (default) is the canonical content surface. No border;
 *   relies on `--color-bg-elevated` contrast against the page background.
 *   Use for marketing blocks, cards on landing pages, FAQ groups.
 * - `inset` is the only tier that carries a border. Use for dense data
 *   containers — tables, code blocks, address pills, callouts. Sits one
 *   step down (`--color-bg`) so it reads as nested inside its Section.
 */
export function Card({
  children,
  className,
  tier = 'section',
}: {
  children: React.ReactNode
  className?: string
  tier?: 'section' | 'inset'
}) {
  return (
    <div
      className={cn(
        'overflow-hidden',
        tier === 'section' &&
          'rounded-2xl bg-[--color-bg-elevated] shadow-[var(--shadow-section)]',
        tier === 'inset' &&
          'rounded-xl border border-[--color-border-soft] bg-[--color-bg]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  title,
  description,
  right,
  className,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  right?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 px-5 pt-5 sm:px-6 sm:pt-6',
        right ? 'sm:flex-row sm:items-start sm:justify-between sm:gap-4' : '',
        className,
      )}
    >
      <div>
        <div className="text-base font-semibold tracking-tight text-[--color-ink]">
          {title}
        </div>
        {description ? (
          <div className="mt-1.5 text-sm text-[--color-ink-soft]">
            {description}
          </div>
        ) : null}
      </div>
      {right}
    </div>
  )
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('px-5 py-5 sm:px-6 sm:py-6', className)}>{children}</div>
}
