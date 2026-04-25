# defiunited-web

Public-facing companion app for the [DeFi United](https://defiunited.world/) coordinated relief coalition. Reads live data from the local Powerhouse Switchboard exposed by [`defi-united-package`](../defi-united-package/).

## Stack

Next 16 (Turbopack) · React 19 · Tailwind · shadcn/Radix · Framer Motion · graphql-request · graphql-ws · TanStack Query · graphql-codegen.

## Routes

| Path | What it does |
|---|---|
| `/` | DeFi United landing — hero with live pledge thermometer, contributors table grouped by status, contribution-address card with copy + QR, dependency grid, "Embed live data" code snippet, FAQ + risk disclaimer, "Fork this for your own crisis" footer. |
| `/campaigns/[slug]` | Per-campaign deep view (read-only). |
| `/contributors/[slug]` | Cross-campaign contributor profile. |
| `/admin` | Operator-gated mutations via Renown DID bearer auth. |
| `/api/embed/campaign/[slug]` | Embeddable JSON for third-party dashboards. |

## Resilience

The landing page is **always screenshot-able**: if the local Switchboard isn't running, every page falls back to a hardcoded snapshot of the seeded `rseth-2026-04` campaign (see `modules/campaign/offline-fallback.ts`). Live data overrides the fallback as soon as the API responds.

## Quick start

```bash
pnpm install
pnpm codegen      # regenerate types from the live Switchboard schema (4001)
pnpm build        # one-shot production build (verified compiling clean)
pnpm dev          # local dev on http://localhost:3002
```

The companion app expects:
- `defi-united-package` running locally via `pnpm vetra` (Switchboard on `:4001`, Connect on `:3001`).
- Override the GraphQL endpoint via `NEXT_PUBLIC_SWITCHBOARD_URL` if needed.

## Layout

```
app/                      Next App Router (5 routes)
modules/
  campaign/               Landing + campaign deep-view feature
    components/           Hero, thermometer, contributors table, FAQ, etc.
    queries.ts            Typed GraphQL queries against the public-campaign subgraph
    use-campaign.ts       TanStack Query hook with 5s polling + offline fallback
    offline-fallback.ts   Screenshot-safe demo data
  contributor/            Contributor profile feature
  operations/             Admin mutations + Renown DID auth bridge
  shared/                 Cross-feature primitives
  __generated__/          graphql-codegen output
tests/                    Playwright smoke tests
```

## Status

v0.1 — production build green, type checks clean. Smoke tests with Playwright are wired but require a running dev server to execute.
