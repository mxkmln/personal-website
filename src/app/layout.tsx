import './globals.css'
import Navigation from '@/components/Navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Muskan Rajoria',
  description: 'Personal website of Muskan Rajoria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-full bg-gray-100 text-gray-900">
        <Navigation />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="mt-auto py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Muskan Rajoria. All rights reserved.
        </footer>
      </body>
    </html>
  )
}