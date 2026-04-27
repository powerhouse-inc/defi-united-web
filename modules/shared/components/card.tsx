import { cn } from '@/modules/shared/lib/cn'

export function Card({
  children,
  className,
  variant = 'glass',
}: {
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'plain' | 'accent'
}) {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        variant === 'glass' && 'glass',
        variant === 'plain' &&
          'border border-[--color-border] bg-[--color-surface]',
        variant === 'accent' &&
          'border border-[--color-brand-border] bg-[--color-surface]',
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
        'flex flex-col gap-3 border-b border-[--color-border-soft] px-4 py-4 sm:px-6',
        right ? 'sm:flex-row sm:items-start sm:justify-between sm:gap-4' : '',
        className,
      )}
    >
      <div>
        <div className="text-sm font-semibold tracking-tight text-[--color-ink]">
          {title}
        </div>
        {description ? (
          <div className="mt-1 text-sm text-[--color-ink-soft]">{description}</div>
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
  return <div className={cn('px-4 py-5 sm:px-6', className)}>{children}</div>
}
