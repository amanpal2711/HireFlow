'use client'

import Link from 'next/link'
import { Button } from '@/frontend/components/ui/button'
import { Card, CardContent } from '@/frontend/components/ui/card'
import { 
  Users, 
  Building,
  ArrowRight
} from 'lucide-react'
import { getCompanies } from '@/backend/supabase/queries'
import { formatNumber } from '@/frontend/lib/utils'
import { useEffect, useState } from 'react'

interface Company {
  id: string
  name: string
  industry: string
  followers: number
  size: string
  logo_url?: string
}

export default function TopCompanies() {
  const [topCompanies, setTopCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companies = await getCompanies(8)
        setTopCompanies(companies || [])
      } catch (err) {
        console.error('Error fetching companies:', err)
        setError('Failed to load companies')
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading companies...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Top Companies Hiring</h2>
            <p className="text-muted-foreground">
              Join leading organizations that are shaping the future
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/companies">
              View All Companies
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {topCompanies?.map((company: Company) => (
            <Card key={company.id} className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  {/* Company Logo */}
                  <div className="mx-auto h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-primary">
                      {company.name.charAt(0)}
                    </span>
                  </div>

                  {/* Company Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold">{company.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {company.industry}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1 text-xs">
                      <Users className="h-3 w-3 text-primary" />
                      <span>{formatNumber(company.followers)} followers</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 text-xs">
                      <Building className="h-3 w-3 text-primary" />
                      <span>{company.size}</span>
                    </div>
                  </div>

                  {/* Open Positions */}
                  <div className="pt-2 border-t">
                    <span className="text-xs font-medium text-primary">
                      {company.name === 'TechMahindra' ? 12 : company.name === 'Flipkart' ? 8 : 6} open positions
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Companies Row */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-muted-foreground">
            <span className="text-sm">And many more...</span>
            <div className="flex -space-x-2">
              {['TCS', 'Infosys', 'Wipro', 'HCL', 'Accenture'].map((name, index) => (
                <div
                  key={name}
                  className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium"
                  style={{ marginLeft: index === 0 ? 0 : '-0.5rem' }}
                >
                  {name.charAt(0)}
                </div>
              ))}
            </div>
            <span className="text-sm font-medium">500+ companies</span>
          </div>
        </div>
      </div>
    </section>
  )
}
