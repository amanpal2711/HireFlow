'use client'

import { useState, useMemo, useEffect } from 'react'
import { Navbar } from '@/frontend/components/shared/navbar'
import { Footer } from '@/frontend/components/shared/footer'
import { JobCard } from '@/frontend/components/shared/job-card'
import { JobFilters } from '@/frontend/components/shared/job-filters'
import { Button } from '@/frontend/components/ui/button'
import { Badge } from '@/frontend/components/ui/badge'
import { 
  ArrowUpDown, 
  Calendar,
  Briefcase,
  Filter
} from 'lucide-react'
import { supabase } from '@/backend/supabase/client'
import { useFilterStore } from '@/frontend/store/filter-store'

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
  skills?: string[]
  description?: string
}

export default function JobsPage() {
  const [sortBy, setSortBy] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)
  const [jobs, setJobs] = useState<Job[]>([])
  
  const {
    keyword,
    location,
    jobType,
    experience,
    salaryMin,
    salaryMax,
    datePosted,
    companySize,
    remote
  } = useFilterStore()

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select(`
            *,
            companies (
              id,
              name,
              slug,
              logo_url,
              headquarters
            )
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Supabase error:', JSON.stringify(error))
          return
        }

        console.log('Jobs fetched:', data?.length)
        setJobs(data || [])

      } catch (err) {
        console.error('Catch error:', JSON.stringify(err))
      }
    }

    fetchJobs()
  }, [location, jobType, experience, salaryMin, salaryMax, datePosted, companySize, remote])

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Keyword filter
      if (keyword) {
        const searchLower = keyword.toLowerCase()
        return (
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.skills.some((skill: string) => skill.toLowerCase().includes(searchLower))
        )
      }

      // Location filter
      if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
        return false
      }

      // Job type filter
      if (jobType.length > 0 && !jobType.includes(job.type)) {
        return false
      }

      // Experience filter
      if (experience.length > 0 && !experience.includes(job.experience)) {
        return false
      }

      // Salary filter
      if (job.salaryMax < salaryMin || job.salaryMin > salaryMax) {
        return false
      }

      // Remote filter
      if (remote && !job.remote) {
        return false
      }

      return true
    })
  }, [jobs, keyword, location, jobType, experience, salaryMin, salaryMax, remote])

  const sortedJobs = useMemo(() => {
    const jobsList = [...filteredJobs]
    switch (sortBy) {
      case 'date':
        return jobsList.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
      case 'salary':
        return jobsList.sort((a, b) => b.salaryMax - a.salaryMax)
      default:
        return jobsList
    }
  }, [filteredJobs, sortBy])

  const jobsPerPage = 12
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage)
  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <JobFilters />
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    {sortedJobs.length} Jobs Found
                  </h1>
                  {filteredJobs.length > 0 && (
                    <p className="text-muted-foreground text-sm">
                      Found {filteredJobs.length} matching opportunities
                    </p>
                  )}
                </div>

                {/* Sort and View Options */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Sort by:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSortBy('date')}
                    >
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Date
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSortBy('salary')}
                    >
                      <span className="flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        Salary
                      </span>
                    </Button>
                  </div>
                  <Button variant="outline" asChild>
                    <span className="flex items-center gap-2">
                      <Filter className="h-4 w-4 mr-2" />
                      Advanced Filters
                    </span>
                  </Button>
                </div>
              </div>

              {/* Active Filters */}
              {(keyword || location || jobType.length > 0 || experience.length > 0 || remote) && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {keyword && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Keywords: {keyword}
                    </Badge>
                  )}
                  {location && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Location: {location}
                    </Badge>
                  )}
                  {remote && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Remote
                    </Badge>
                  )}
                  {jobType.map((type) => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      {type.replace('-', ' ')}
                    </Badge>
                  ))}
                  {experience.map((level) => (
                    <Badge key={level} variant="secondary" className="flex items-center gap-1">
                      {level}
                    </Badge>
                  ))}
                  <Button onClick={() => window.location.reload()}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Job Cards Grid */}
            {paginatedJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {paginatedJobs.map((job: Job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to find more opportunities.
                  </p>
                  <Button onClick={() => window.location.reload()}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
