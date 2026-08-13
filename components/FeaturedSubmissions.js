'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, User } from 'lucide-react'

export function FeaturedSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/submissions/featured')
      .then(res => res.json())
      .then(data => {
        setSubmissions(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load featured submissions:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="h-64 bg-parchment-200 animate-pulse rounded-lg" />
  }

  if (submissions.length === 0) {
    return (
      <Card className="border-2 border-dashed border-terracotta-200 bg-parchment-50">
        <CardContent className="p-12 text-center">
          <p className="text-charcoal-600">No featured memories yet. Be the first to share!</p>
        </CardContent>
      </Card>
    )
  }

  const featured = submissions[0]

  return (
    <Link href={`/memory/${featured.slug}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-terracotta-200 bg-gradient-to-br from-parchment-50 to-terracotta-50/30">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-4">
            <Badge className="bg-terracotta-600 text-white">
              Featured Memory
            </Badge>
            <div className="flex items-center text-sm text-charcoal-600">
              <MapPin className="h-4 w-4 mr-1" />
              {featured.state?.name}
              {featured.district && `, ${featured.district.name}`}
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-charcoal-900 mb-3 group-hover:text-terracotta-700 transition-colors">
            {featured.title}
          </h2>

          <p className="text-lg text-charcoal-700 mb-6 line-clamp-3">
            {featured.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-600">
            <div className="flex items-center">
              <Badge variant="outline" className="border-sage-300 text-sage-700">
                {featured.category?.name}
              </Badge>
            </div>
            {featured.contributorName && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                Remembered by {featured.contributorName}
              </div>
            )}
            {featured.language && (
              <div className="text-indigo-600 font-medium">
                {featured.language.name}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}