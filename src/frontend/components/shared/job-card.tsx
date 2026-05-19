'use client'

import Link from 'next/link'
import { Button } from '@/frontend/components/ui/button'
import { Badge } from '@/frontend/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/frontend/components/ui/card'
import { 
  MapPin, 
  Calendar, 
  Bookmark, 
  BookmarkCheck,
  TrendingUp,
  ExternalLink
} from 'lucide-react'
import { formatSalary, formatDate } from '@/frontend/lib/utils'
import { useFilterStore } from '@/frontend/store/filter-store'
import { cn } from '@/frontend/lib/utils'

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    type: string
    experience: string
    salary_min: number
    salary_max: number
    description: string
    requirements: string[]
    responsibilities: string[]
    skills: string[]
    remote: boolean
    easy_apply: boolean
    ai_match?: number
    deadline?: string
    posted_date?: string
    created_at?: string
    updated_at?: string
    companies?: {
      id: string
      name: string
      slug: string
      logo_url?: string
      headquarters: string
    }
  }
  className?: string
}

export function JobCard({ job, className }: JobCardProps) {
  const { savedJobs, toggleSaveJob } = useFilterStore()
  const isSaved = savedJobs.includes(job.id)

  return (
    <Card className={cn('hover:shadow-md transition-shadow duration-200', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {(job.companies?.name || job.company || 'Company').charAt(0) || '?'}
              </span>
            </div>
            <div className="flex-1">
              <Link href={`/jobs/${job.id}`}>
                <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                  {job.title}
                </h3>
              </Link>
              <p className="text-muted-foreground font-medium">{job.companies?.name || job.company}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => toggleSaveJob(job.id)}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-3 space-y-3">
        {/* Location and Remote */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          {job.remote && (
            <Badge variant="secondary" className="text-xs">
              Remote
            </Badge>
          )}
        </div>

        {/* Job Type */}
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            {job.type?.replace('-', ' ') || 'Not specified'}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {job.experience || 'Not specified'}
          </Badge>
        </div>

        {/* Salary */}
        <div className="text-sm font-medium text-primary">
          {formatSalary(job.salary_min, job.salary_max)}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {job.skills?.slice(0, 2).map((skill: string) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills && job.skills.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 2}
            </Badge>
          )}
        </div>

        {/* AI Match Badge */}
        {job.ai_match !== undefined && job.ai_match > 80 && (
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-accent" />
            <Badge variant="accent" className="text-xs">
              AI Match {job.ai_match}%
            </Badge>
          </div>
        )}

        {/* Posted Date */}
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(job.posted_date || job.created_at)}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          {job.easy_apply ? (
            <Button className="flex-1" asChild>
              <Link href={`/jobs/${job.id}`}>Easy Apply</Link>
            </Button>
          ) : (
            <Button variant="outline" className="flex-1" asChild>
              <a href={`/jobs/${job.id}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply on Site
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
