'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Interactive Explorer', href: '/explorer' },
  { name: 'Explore', href: '/explore' },
  { name: 'Markets', href: '/markets' },
  { name: 'Sources', href: '/sources' },
]

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className='sticky top-0 z-50 bg-background border-b border-border text-foreground shadow-lg'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='text-xl font-bold'>
            Mapping Flavor
          </Link>

          {/* Navigation Links */}
          <div className='hidden md:flex space-x-8'>
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className='hover:text-accent transition-colors'
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Language Toggle */}
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => router.push('?lang=zh')}
              className='hover:text-accent transition-colors'
            >
              EN / 中文
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
