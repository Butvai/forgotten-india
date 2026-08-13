import './globals.css'
import { Providers } from './providers'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Forgotten India | A living archive of disappearing culture',
  description: 'Forgotten India preserves the recipes, songs, stories, remedies, rituals and little pieces of wisdom that survived because someone remembered them.',
  keywords: 'India, culture, heritage, traditions, recipes, folk songs, stories, archive',
  openGraph: {
    title: 'Forgotten India',
    description: 'A living archive of disappearing culture',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-parchment-50 text-charcoal-900">
        <Providers>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}