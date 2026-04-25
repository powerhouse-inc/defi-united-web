'use client'

import { useEffect, useState } from 'react'

/**
 * Lazily attempts to load `useRenown` from `@powerhousedao/reactor-browser`.
 *
 * The package isn't a hard dependency here — it pulls in a lot of
 * runtime that doesn't belong in a static-ish landing page. When it isn't
 * installed we surface a soft fallback so the admin UI still renders the
 * gate and the UX is clear.
 */
type RenownLike = {
  getBearerToken: (opts?: { expiresIn?: number }) => Promise<string | null>
  did?: string | null
  address?: string | null
}

type Status =
  | { kind: 'loading' }
  | { kind: 'unavailable'; reason: string }
  | { kind: 'ready'; renown: RenownLike | null }

export function useRenownAuth(): Status {
  const [status, setStatus] = useState<Status>({ kind: 'loading' })

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        // @ts-expect-error - optional peer dep; only present when this app is mounted from the cloud bundle
        const mod = (await import('@powerhousedao/reactor-browser').catch(
          () => null,
        )) as null | { useRenown?: () => RenownLike | null }
        if (cancelled) return
        if (!mod || typeof mod.useRenown !== 'function') {
          setStatus({
            kind: 'unavailable',
            reason:
              '@powerhousedao/reactor-browser is not installed in this app. Mount this page from a host that ships the cloud bundle.',
          })
          return
        }
        // We can't actually call the hook here (rules of hooks); this
        // detection is enough for the gate. The actual hook call happens
        // inside `<RenownGate />` on the admin page when this returns ready.
        setStatus({ kind: 'ready', renown: null })
      } catch (err) {
        if (cancelled) return
        setStatus({
          kind: 'unavailable',
          reason: `failed to load reactor-browser: ${String(err)}`,
        })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return status
}
