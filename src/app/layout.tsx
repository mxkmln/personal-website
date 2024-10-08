import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'Muskan Rajoria',
  description: 'Personal website of Muskan Rajoria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}