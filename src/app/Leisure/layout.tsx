import '../globals.css'

export const metadata = {
  title: 'Leisure | Muskan Rajoria',
  description: 'Leisure activities of Muskan Rajoria',
}

export default function LeisureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {children}
    </main>
  )
}