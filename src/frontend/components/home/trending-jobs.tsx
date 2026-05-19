'use client'

import Link from 'next/link'
import { Button } from '@/frontend/components/ui/button'
import { Badge } from '@/frontend/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/frontend/components/ui/card'
import { 
  MapPin, 
  TrendingUp,
  ArrowRight
} from 'lucide-react'
import { formatSalary, formatDate } from '@/frontend/lib/utils'

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  salary_min?: number
  salary_max?: number
  job_type: string
  posted_at: string
  aiMatch?: number
}

interface TrendingJobsProps {
  trendingJobs?: Job[]
}

export function TrendingJobs({ trendingJobs = [] }: TrendingJobsProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Jobs</h2>
            <p className="text-muted-foreground">
              Discover the most popular opportunities this week
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/jobs">
              View All Jobs
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingJobs?.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-sm font-bold text-primary">
                        {job.company?.charAt(0) || '?'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/jobs/${job.id}`}>
                        <h3 className="font-semibold text-sm hover:text-primary transition-colors truncate">
                          {job.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground truncate">{job.company || 'Unknown Company'}</p>
                    </div>
                  </div>
                  {job.aiMatch && job.aiMatch > 80 && (
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Location and Remote */}
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{job.location || 'Location not specified'}</span>
                  {job.remote && (
                    <Badge variant="outline" className="text-xs">
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
                  {formatSalary(job.salaryMin, job.salaryMax)}
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

                {/* AI Match */}
                {job.aiMatch > 80 && (
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <Badge variant="accent" className="text-xs">
                      AI Match {job.aiMatch}%
                    </Badge>
                  </div>
                )}

                {/* Posted Date */}
                <div className="text-xs text-muted-foreground">
                  {formatDate(job.postedDate)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
