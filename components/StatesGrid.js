'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, ChevronRight } from 'lucide-react'

export function StatesGrid({ limit = null }) {
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = limit ? `/api/states?limit=${limit}` : '/api/states'
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setStates(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load states:', err)
        setLoading(false)
      })
  }, [limit])

  if (loading) {
    return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(limit || 8)].map((_, i) => (
        <div key={i} className="h-24 bg-parchment-200 animate-pulse rounded-lg" />
      ))}
    </div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {states.map((state) => (
        <Link key={state.id} href={`/${state.slug}`}>
          <Card className="group hover:shadow-md hover:border-sage-400 transition-all duration-200 cursor-pointer border-2 border-sage-200 bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-sage-600 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-charcoal-900 group-hover:text-sage-700 transition-colors text-sm">
                    {state.name}
                  </h3>
                  <p className="text-xs text-charcoal-500">{state.type === 'union_territory' ? 'UT' : 'State'}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-charcoal-400 group-hover:text-sage-600 transition-colors" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}