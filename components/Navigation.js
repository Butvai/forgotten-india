'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, Search, User } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-parchment-50/95 backdrop-blur-sm border-b border-terracotta-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-display font-bold text-terracotta-700">
              Forgotten India
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/india" className="text-charcoal-700 hover:text-terracotta-600 transition-colors">
              Explore
            </Link>
            <Link href="/search" className="text-charcoal-700 hover:text-terracotta-600 transition-colors">
              Search
            </Link>
            <Link href="/about" className="text-charcoal-700 hover:text-terracotta-600 transition-colors">
              About
            </Link>
            <Link href="/share">
              <Button size="sm" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
                Share a memory
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="sm" variant="ghost">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-charcoal-700" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-terracotta-100 space-y-3">
            <Link href="/india" className="block text-charcoal-700 hover:text-terracotta-600">
              Explore
            </Link>
            <Link href="/search" className="block text-charcoal-700 hover:text-terracotta-600">
              Search
            </Link>
            <Link href="/about" className="block text-charcoal-700 hover:text-terracotta-600">
              About
            </Link>
            <Link href="/share" className="block">
              <Button size="sm" className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white">
                Share a memory
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
