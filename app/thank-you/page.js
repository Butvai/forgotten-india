import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Home, ChevronRight } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-parchment-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full border-2 border-terracotta-200 bg-gradient-to-br from-parchment-50 to-terracotta-50/30">
        <CardContent className="p-12 text-center space-y-6">
          <Heart className="h-16 w-16 text-terracotta-600 fill-terracotta-600 mx-auto" />
          
          <h1 className="text-4xl font-display font-bold text-charcoal-900">
            Thank you for remembering.
          </h1>
          
          <p className="text-xl text-charcoal-700">
            Your submission is now being reviewed. Once approved, it will become part of India's living archive.
          </p>
          
          <div className="pt-6 space-y-4">
            <p className="text-charcoal-600">
              Before it disappears, write it down.<br />
              Every memory matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" variant="outline" className="border-2 border-charcoal-300">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/contribute">
                <Button size="lg" className="bg-terracotta-600 hover:bg-terracotta-700">
                  Share Another Memory
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}