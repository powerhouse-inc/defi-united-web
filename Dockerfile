# syntax=docker/dockerfile:1.7
# =============================================================================
# defiunited-web — Next.js 16 production image
#
# Multi-stage build that produces a self-contained image (~120 MB) running
# the Next.js standalone server. Designed to be published to cr.vetra.io and
# rolled out via the standard Powerhouse hosting GitOps flow.
#
# Build:
#   docker build -t cr.vetra.io/defi-united/web:latest .
# Run:
#   docker run --rm -p 3002:3002 \
#     -e NEXT_PUBLIC_SWITCHBOARD_URL=https://switchboard.example/graphql \
#     -e NEXT_PUBLIC_DEFAULT_CAMPAIGN_SLUG=rseth-2026-04 \
#     cr.vetra.io/defi-united/web:latest
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: dependencies
# -----------------------------------------------------------------------------
FROM node:24-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# -----------------------------------------------------------------------------
# Stage 2: build
# -----------------------------------------------------------------------------
FROM node:24-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Build-time public env vars — exposed to the client bundle. Override at
# image-build time with `--build-arg`.
ARG NEXT_PUBLIC_SWITCHBOARD_URL=https://switchboard.defiunited.space/graphql
ARG NEXT_PUBLIC_DEFAULT_CAMPAIGN_SLUG=rseth-2026-04
ARG NEXT_PUBLIC_BASE_URL=https://defiunited.space

ENV NEXT_PUBLIC_SWITCHBOARD_URL=$NEXT_PUBLIC_SWITCHBOARD_URL
ENV NEXT_PUBLIC_DEFAULT_CAMPAIGN_SLUG=$NEXT_PUBLIC_DEFAULT_CAMPAIGN_SLUG
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Skip turbopack for the production build — slightly more compatible.
RUN pnpm exec next build

# -----------------------------------------------------------------------------
# Stage 3: runtime
# -----------------------------------------------------------------------------
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3002
ENV HOSTNAME=0.0.0.0

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Standalone server (server.js + minimal node_modules) and static assets.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3002

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:${PORT}/ || exit 1

CMD ["node", "server.js"]
