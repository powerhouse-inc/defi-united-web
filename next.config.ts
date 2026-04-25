import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    externalDir: true,
  },
  turbopack: {
    // Pin the workspace root so Turbopack doesn't get confused by the
    // pnpm-lock.yaml in /home/froid/projects/.
    root: path.resolve(__dirname),
  },
  // Silence the "outputFileTracingRoot" inference warning when running
  // alongside the broader powerhouse monorepo.
  outputFileTracingRoot: path.resolve(__dirname),
}

export default nextConfig
