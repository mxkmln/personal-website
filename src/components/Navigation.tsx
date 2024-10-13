'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: '#23', path: '/23' },
    { name: 'Leisure', path: '/Leisure' },
    // { name: 'Blog', path: '/Blog' }, //
    { name: 'Contact', path: '/Contact' },
  ]

 

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="flex items-center space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`py-4 px-2 transition duration-300 ${
                  pathname === item.path
                    ? 'text-gray-700 font-bold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation