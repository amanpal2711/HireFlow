'use client'

import { useState } from 'react'
import { Button } from '@/frontend/components/ui/button'
import { Input } from '@/frontend/components/ui/input'
import { Badge } from '@/frontend/components/ui/badge'
import { 
  Search, 
  MapPin, 
  TrendingUp,
  ArrowRight
} from 'lucide-react'
import { categories, locations } from '@/frontend/lib/mock-data'
import { cn } from '@/frontend/lib/utils'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, 'in', selectedLocation)
  }

  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4">
              <TrendingUp className="h-3 w-3 mr-1" />
              AI-Powered Job Matching
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Find Your
              <span className="text-primary"> Dream Job</span>
              <br />
              in India
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with top companies, discover opportunities that match your skills, 
              and take your career to the next level with our AI-powered platform.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-background rounded-lg shadow-lg p-2 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Job title, skills, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-0 focus:ring-0"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={cn(
                    "flex h-10 w-full rounded-md border-0 bg-background px-3 py-2 text-sm ring-offset-background",
                    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                    "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    "pl-10 appearance-none cursor-pointer"
                  )}
                >
                  <option value="">All locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <Button 
                size="lg" 
                className="px-8"
                onClick={handleSearch}
              >
                Search Jobs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Popular Categories</p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.slice(0, 8).map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">2M+</div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">10M+</div>
              <div className="text-sm text-muted-foreground">Candidates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
