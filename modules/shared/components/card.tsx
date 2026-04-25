import { cn } from '@/modules/shared/lib/cn'

export function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[--color-border] bg-[--color-surface] shadow-[0_1px_2px_rgb(15_23_42_/_0.04)]',
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
        'flex items-start justify-between gap-4 border-b border-[--color-border-soft] px-6 py-4',
        className,
      )}
    >
      <div>
        <div className="text-sm font-semibold tracking-tight">{title}</div>
        {description ? (
          <div className="mt-0.5 text-sm text-[--color-ink-soft]">{description}</div>
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
  return <div className={cn('px-6 py-5', className)}>{children}</div>
}
