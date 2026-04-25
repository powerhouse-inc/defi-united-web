import Link from 'next/link'
import { cn } from '@/modules/shared/lib/cn'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[--color-border] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[--color-brand] text-white text-xs font-semibold">
            DU
          </span>
          <span className="text-sm font-semibold tracking-tight">DeFi United</span>
          <span className="hidden text-xs text-[--color-ink-soft] sm:inline">
            · operational hub
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <NavLink href="/">Campaign</NavLink>
          <NavLink href="/campaigns/rseth-2026-04">Detail</NavLink>
          <NavLink href="/admin">Operators</NavLink>
        </nav>
      </div>
    </header>
  )
}

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        'rounded-lg px-3 py-1.5 text-[--color-ink-muted] hover:bg-[--color-border-soft] hover:text-[--color-ink]',
      )}
    >
      {children}
    </Link>
  )
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[--color-border] bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-2">
        <div>
          <div className="text-sm font-semibold">Built on Powerhouse</div>
          <p className="mt-2 max-w-md text-sm text-[--color-ink-soft]">
            Every contribution status, dependency, and disclosure on this page
            is read live from a public GraphQL API powered by the
            defi-united-package on the Powerhouse Reactor.
          </p>
        </div>
        <div className="sm:text-right">
          <div className="text-sm font-semibold">Fork this for your own crisis</div>
          <p className="mt-2 text-sm text-[--color-ink-soft]">
            Take the document models, editors, and subgraphs.
          </p>
          <a
            href="https://registry.dev.vetra.io/-/web/detail/defi-united-package"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[--color-brand] px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600"
          >
            Open the package
          </a>
        </div>
      </div>
      <div className="border-t border-[--color-border-soft] px-6 py-4 text-center text-xs text-[--color-ink-soft]">
        Public GraphQL · http://localhost:4001/graphql · powered by Powerhouse Switchboard
      </div>
    </footer>
  )
}
