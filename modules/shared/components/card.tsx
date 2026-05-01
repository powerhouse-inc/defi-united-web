import { cn } from '@/modules/shared/lib/cn'

/**
 * Single canonical surface — semi-translucent glass with a hairline
 * border and a soft shadow. Used uniformly across the app so that
 * cards, panels and data containers all read as the same surface.
 *
 * Callouts (warning, brand) override `className` to tint the border
 * and bg — they remain a single Card surface, just a coloured one.
 */
export function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('glass overflow-hidden rounded-2xl', className)}>
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
