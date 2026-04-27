'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Moon, Sun, Github, Menu, X, ExternalLink } from 'lucide-react'
import { cn } from '@/modules/shared/lib/cn'
import { useTheme } from '@/modules/shared/providers/theme-provider'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="absolute left-4 top-[-44px] z-50 rounded-lg px-4 py-2 text-sm font-medium text-white transition focus:left-4 focus:top-4"
        style={{ background: 'linear-gradient(135deg, #8e5cff 0%, #e63e9d 100%)' }}
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

const navLinks = [
  { href: '/', label: 'Live' },
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/admin', label: 'Operators' },
]

function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-[--color-border] bg-[--color-bg]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg text-[10px] font-bold text-white transition-transform group-hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #8e5cff 0%, #e63e9d 100%)',
              boxShadow: '0 4px 14px -4px rgba(142, 92, 255, 0.6)',
            }}
          >
            DU
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">DeFi United</span>
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[--color-ink-soft]">DAO</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 text-sm sm:flex" aria-label="Primary navigation">
          {navLinks.map(link => (
            <NavLink
              key={link.href}
              href={link.href}
              active={link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)}
            >
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-8 w-8 place-items-center rounded-lg text-[--color-ink-muted] hover:bg-[--color-border-soft]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {open && (
        <div className="border-t border-[--color-border-soft] sm:hidden" inert={!open}>
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Primary navigation">
            {navLinks.map(link => (
              <NavLink
                key={link.href}
                href={link.href}
                active={link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({
  href,
  children,
  active,
  onClick,
}: {
  href: string
  children: React.ReactNode
  active: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'rounded-lg px-3 py-1.5 transition-colors',
        active
          ? 'bg-[--color-brand-soft] text-[--color-brand] font-medium'
          : 'text-[--color-ink-muted] hover:bg-[--color-border-soft] hover:text-[--color-ink]',
      )}
    >
      {children}
    </Link>
  )
}

function ThemeToggle() {
  const [theme, toggleTheme] = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="grid h-8 w-8 place-items-center rounded-lg text-[--color-ink-muted] transition hover:bg-[--color-border-soft] hover:text-[--color-ink]"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-[--color-border] bg-[--color-bg-elevated]/40 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Fork banner */}
        <div
          className="mb-10 overflow-hidden rounded-2xl border border-[--color-brand-border] p-6 sm:p-8"
          style={{
            background:
              'linear-gradient(135deg, rgba(142,92,255,0.08) 0%, rgba(230,62,157,0.06) 100%)',
          }}
        >
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[--color-brand-glow]">
                Reusable
              </div>
              <h3 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                Fork this coalition for the next incident.
              </h3>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-[--color-ink-muted]">
                Document models, editors, processors and subgraphs ship as one Powerhouse package. Spin up your own coordination layer in minutes.
              </p>
            </div>
            <a
              href="https://registry.dev.vetra.io/-/web/detail/defi-united-package"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition"
              style={{
                background: 'linear-gradient(135deg, #8e5cff 0%, #e63e9d 100%)',
                boxShadow: '0 8px 24px -4px rgba(142, 92, 255, 0.5), inset 0 1px 0 0 rgba(255,255,255,0.18)',
              }}
            >
              Get the package
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="grid h-7 w-7 place-items-center rounded-lg text-[10px] font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #8e5cff 0%, #e63e9d 100%)',
                }}
              >
                DU
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight">DeFi United</span>
                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[--color-ink-soft]">DAO</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-[--color-ink-soft]">
              Coordinated relief for DeFi incidents. Public data, on-chain receipts, verifiable pledges.
            </p>
          </div>

          <nav className="flex items-start gap-8 text-sm text-[--color-ink-muted] md:justify-center" aria-label="Footer navigation">
            <div className="space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[--color-ink-soft]">Pages</div>
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm transition-colors hover:text-[--color-ink]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[--color-ink-soft]">Project</div>
              <a
                href="https://registry.dev.vetra.io/-/web/detail/defi-united-package"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm transition-colors hover:text-[--color-ink]"
              >
                Vetra Package
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
              <a
                href="https://github.com/powerhouse-inc/defi-united-web"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm transition-colors hover:text-[--color-ink]"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub (web)
              </a>
              <a
                href="https://github.com/powerhouse-inc/defi-united-package"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm transition-colors hover:text-[--color-ink]"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub (package)
              </a>
            </div>
          </nav>

          <div className="flex flex-col items-start justify-end text-xs text-[--color-ink-soft] md:items-end">
            <span>AGPL-3.0 · Built on Powerhouse</span>
            <span className="mt-1 font-mono text-[10px] text-[--color-ink-soft]/70">
              v0.1.0
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-[--color-border-soft] px-6 py-4 text-center text-xs text-[--color-ink-soft]">
        © {new Date().getFullYear()} DeFi United · A Powerhouse package
      </div>
    </footer>
  )
}
