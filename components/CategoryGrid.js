'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import * as Icons from 'lucide-react'

export function CategoryGrid() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load categories:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-32 bg-parchment-200 animate-pulse rounded-lg" />
      ))}
    </div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => {
        const IconComponent = Icons[category.icon] || Icons.Circle
        
        return (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <Card className="group hover:shadow-lg hover:border-terracotta-300 transition-all duration-200 cursor-pointer h-full border-2 border-terracotta-100 bg-parchment-50">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-terracotta-100 group-hover:bg-terracotta-200 flex items-center justify-center transition-colors">
                  <IconComponent className="h-6 w-6 text-terracotta-600" />
                </div>
                <h3 className="font-display font-semibold text-charcoal-900 group-hover:text-terracotta-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-charcoal-600 line-clamp-2">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}