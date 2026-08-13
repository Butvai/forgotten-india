import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-parchment-100 py-12 border-t border-charcoal-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-display font-bold text-xl mb-4 text-terracotta-400">Forgotten India</h3>
            <p className="text-sm text-parchment-300 leading-relaxed">
              Preserving India's disappearing culture, one memory at a time.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-4 text-parchment-200">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/india" className="text-parchment-300 hover:text-terracotta-400 transition-colors">All States</Link></li>
              <li><Link href="/categories" className="text-parchment-300 hover:text-terracotta-400 transition-colors">Categories</Link></li>
              <li><Link href="/search" className="text-parchment-300 hover:text-terracotta-400 transition-colors">Search</Link></li>
            </ul>
          </div>

          {/* Contribute */}
          <div>
            <h4 className="font-semibold mb-4 text-parchment-200">Contribute</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contribute" className="text-parchment-300 hover:text-terracotta-400 transition-colors">Share a Memory</Link></li>
              <li><Link href="/guidelines" className="text-parchment-300 hover:text-terracotta-400 transition-colors">Guidelines</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4 text-parchment-200">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-parchment-300 hover:text-terracotta-400 transition-colors">Our Mission</Link></li>
              <li><Link href="/privacy" className="text-parchment-300 hover:text-terracotta-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="text-parchment-300 hover:text-terracotta-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-charcoal-800 text-center text-sm text-parchment-400">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-terracotta-500 fill-terracotta-500" /> for India's memories
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Forgotten India. All memories belong to their contributors.
          </p>
        </div>
      </div>
    </footer>
  )
}