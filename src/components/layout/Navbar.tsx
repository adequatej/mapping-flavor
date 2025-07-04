'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Interactive Explorer', href: '/explorer' },
  { name: 'Markets', href: '/markets' },
  { name: 'Vendors', href: '/vendors' },
  { name: 'Sources', href: '/sources' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className='sticky top-0 z-50 bg-background border-b border-border text-foreground shadow-lg'>
      {/* Logo - Outside container for full viewport width */}
      <Link
        href='/'
        className='text-xl font-bold absolute left-6 top-1/2 -translate-y-1/2'
        onClick={closeMobileMenu}
      >
        Mapping Flavor
      </Link>

      {/* Center container for navigation */}
      <div className='w-full flex justify-center'>
        {/* Desktop Navigation Links */}
        <div className='hidden md:flex items-center h-16 space-x-2'>
          {navigation.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-accent/5 hover:text-accent'
                  }
                `}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={toggleMobileMenu}
          className='md:hidden absolute right-4 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center w-8 h-8 space-y-1'
          aria-label='Toggle mobile menu'
        >
          <span
            className={`h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition duration-300 ease-in-out ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`absolute top-16 left-0 right-0 bg-background border-b border-border md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {navigation.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobileMenu}
              className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors
                ${
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'hover:bg-accent/5 hover:text-accent'
                }
              `}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
