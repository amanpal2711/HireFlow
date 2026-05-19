'use client'

import Link from 'next/link'
import { Button } from '@/frontend/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/frontend/components/ui/card'
import { 
  MapPin, 
  Users, 
  Building, 
  Star,
  TrendingUp
} from 'lucide-react'
import { Company } from '@/frontend/lib/mock-data'
import { formatNumber } from '@/frontend/lib/utils'
import { cn } from '@/frontend/lib/utils'

interface CompanyCardProps {
  company: Company
  className?: string
  showFollowButton?: boolean
}

export function CompanyCard({ company, className, showFollowButton = true }: CompanyCardProps) {
  return (
    <Card className={cn('hover:shadow-md transition-shadow duration-200', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {company.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <Link href={`/companies/${company.id}`}>
                <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                  {company.name}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground">{company.industry}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3 space-y-3">
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{company.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({formatNumber(company.reviewCount)} reviews)
          </span>
        </div>

        {/* Company Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{company.hq}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{company.size} employees</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>Founded {company.founded}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {company.description}
        </p>

        {/* Followers */}
        <div className="flex items-center space-x-1">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            {formatNumber(company.followers)} followers
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`/companies/${company.id}`}>
              View Profile
            </Link>
          </Button>
          {showFollowButton && (
            <Button className="flex-1">
              Follow
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
