import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),
  // Self-contained `node server.js` bundle for Docker — copies only the
  // .js modules + minimal node_modules into .next/standalone.
  output: 'standalone',
}

export default nextConfig
