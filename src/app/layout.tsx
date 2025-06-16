import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Production Starter',
  description: 'A production-ready Next.js application with TypeScript, Tailwind CSS, and shadcn/ui',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Next.js Production Starter',
    description: 'A production-ready Next.js application with TypeScript, Tailwind CSS, and shadcn/ui',
    siteName: 'Next.js Production Starter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js Production Starter',
    description: 'A production-ready Next.js application with TypeScript, Tailwind CSS, and shadcn/ui',
    creator: '@yourusername',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-background font-sans antialiased">
          <main className="relative flex min-h-screen flex-col">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}