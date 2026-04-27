import type { Metadata } from 'next'
import { Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/modules/shared/providers/query-provider'
import { ThemeProvider } from '@/modules/shared/providers/theme-provider'
import { ToastProvider } from '@/modules/shared/providers/toast-provider'
import { SiteShell } from '@/modules/shared/components/site-shell'
import { ErrorBoundary } from '@/modules/shared/components/error-boundary'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
})

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://defiunited.xyz'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'DeFi United — coordinated relief for DeFi incidents',
  description:
    'Live, public coordination layer for the DeFi United relief campaign. Pledges, governance status, dependencies, and on-chain receipts in one place.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: 'DeFi United',
    url: '/',
    title: 'DeFi United — coordinated relief for DeFi incidents',
    description:
      'Live, public coordination layer for the DeFi United relief campaign. Pledges, governance status, dependencies, and on-chain receipts in one place.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'DeFi United campaign overview with pledge progress',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeFi United — coordinated relief for DeFi incidents',
    description:
      'Live, public coordination layer for the DeFi United relief campaign. Pledges, governance status, dependencies, and on-chain receipts in one place.',
    images: ['/api/og'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try{
              var t=localStorage.getItem('theme');
              if(t==='light'){document.documentElement.setAttribute('data-theme','light');return}
              document.documentElement.setAttribute('data-theme','dark');
            }catch(e){
              document.documentElement.setAttribute('data-theme','dark');
            }
          })();
        `}} />
        <ErrorBoundary>
          <ThemeProvider>
            <QueryProvider>
              <ToastProvider>
                <SiteShell>{children}</SiteShell>
              </ToastProvider>
            </QueryProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
