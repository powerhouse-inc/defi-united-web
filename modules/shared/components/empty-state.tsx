export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="rounded-full bg-[--color-border-soft] p-3 text-[--color-ink-soft]">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-4 text-sm font-semibold">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-xs text-xs text-[--color-ink-soft]">{description}</p>
      ) : null}
    </div>
  )
}
