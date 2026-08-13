'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { StatesGrid } from '@/components/StatesGrid'
import { MapPin, Search } from 'lucide-react'
import { useState } from 'react'

export default function IndiaPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-parchment-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <MapPin className="h-12 w-12 text-sage-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Explore India
          </h1>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            Discover traditions, recipes, stories, and wisdom from every corner of India.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
            <Input
              placeholder="Search states..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 border-2"
            />
          </div>
        </div>

        {/* States & UTs */}
        <div>
          <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">
            All States & Union Territories
          </h2>
          <StatesGrid />
        </div>

        {/* Info Card */}
        <Card className="mt-12 border-2 border-indigo-200 bg-indigo-50/30">
          <CardContent className="p-8">
            <h3 className="text-xl font-display font-bold text-charcoal-900 mb-3">
              India's oldest archive is still in people's memories
            </h3>
            <p className="text-charcoal-700 leading-relaxed">
              Every state, every district, every village has knowledge that exists nowhere else. We're building a home for all of it. Click on any state to explore memories from that region, or share what your family taught you.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}