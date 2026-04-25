import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/modules/shared/providers/query-provider'
import { SiteShell } from '@/modules/shared/components/site-shell'

export const metadata: Metadata = {
  title: 'DeFi United — coordinated relief for DeFi incidents',
  description:
    'Live, public coordination layer for the DeFi United relief campaign. Pledges, governance status, dependencies, and on-chain receipts in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <SiteShell>{children}</SiteShell>
        </QueryProvider>
      </body>
    </html>
  )
}
