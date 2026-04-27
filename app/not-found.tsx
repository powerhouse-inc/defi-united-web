import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold">Not found</h1>
      <p className="text-sm text-[--color-ink-soft]">
        The campaign or contributor you’re looking for isn’t indexed by the
        Switchboard reachable from this page.
      </p>
      <Link
        href="/"
        className="rounded-lg px-3 py-2 text-sm font-medium text-white"
        style={{ background: 'linear-gradient(135deg, #8e5cff 0%, #e63e9d 100%)' }}
      >
        Back to the campaign
      </Link>
    </div>
  )
}
