'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/frontend/components/ui/button'
import { Badge } from '@/frontend/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/frontend/components/ui/card'
import { 
  MapPin, 
  Calendar, 
  Clock,
  DollarSign,
  Share2,
  Flag,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  TrendingUp,
  Building,
  Users
} from 'lucide-react'
import { Navbar } from '@/frontend/components/shared/navbar'
import { Footer } from '@/frontend/components/shared/footer'
import { JobCard } from '@/frontend/components/shared/job-card'
import { jobs } from '@/frontend/lib/mock-data'
import { formatSalary, formatDate } from '@/frontend/lib/utils'
import { useFilterStore } from '@/frontend/store/filter-store'
import { cn } from '@/frontend/lib/utils'

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { savedJobs, toggleSaveJob } = useFilterStore()
  const jobId = params.id as string

  const job = jobs.find(j => j.id === jobId)
  const isSaved = savedJobs.includes(jobId)

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push('/jobs')}>
            Back to Jobs
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  const similarJobs = jobs
    .filter(j => j.id !== jobId && (j.company === job.company || j.type === job.type))
    .slice(0, 3)

  const toSharedJobCardJob = (similarJob: typeof jobs[number]) => ({
    id: similarJob.id,
    title: similarJob.title,
    company: similarJob.company,
    location: similarJob.location,
    type: similarJob.type,
    experience: similarJob.experience,
    salary_min: similarJob.salaryMin,
    salary_max: similarJob.salaryMax,
    description: similarJob.description,
    requirements: similarJob.requirements,
    responsibilities: similarJob.responsibilities,
    skills: similarJob.skills,
    remote: similarJob.remote,
    easy_apply: similarJob.easyApply,
    ai_match: similarJob.aiMatch,
    deadline: similarJob.deadline,
    posted_date: similarJob.postedDate,
  })

  const jobTypeColors = {
    'full-time': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'part-time': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'contract': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'internship': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  }

  const experienceColors = {
    'entry': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'mid': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'senior': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'lead': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-foreground">Jobs</Link>
          <span>/</span>
          <span className="text-foreground">{job.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {job.company.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <span className="font-medium">{job.company}</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(job.postedDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSaveJob(jobId)}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="h-5 w-5 text-primary" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={cn('text-sm', jobTypeColors[job.type])}>
                    {job.type.replace('-', ' ')}
                  </Badge>
                  <Badge className={cn('text-sm', experienceColors[job.experience])}>
                    {job.experience}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </Badge>
                  {job.remote && (
                    <Badge variant="secondary" className="text-sm">
                      Remote
                    </Badge>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* About the Role */}
            <Card>
              <CardHeader>
                <CardTitle>About the Role</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* About Company */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {job.company.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {job.company} is a leading {job.industry} company committed to innovation and excellence. 
                      We offer competitive compensation, great benefits, and opportunities for professional growth.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Building className="h-4 w-4 text-primary" />
                        <span>{job.industry}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{job.companySize}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {similarJobs.map((similarJob) => (
                      <JobCard key={similarJob.id} job={toSharedJobCardJob(similarJob)} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar - Sticky Apply Card */}
          <div className="w-full lg:w-96 space-y-6">
            <div className="sticky top-20 space-y-6">
              {/* Apply Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this Position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Salary Range */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Salary Range</span>
                      <span className="text-sm text-muted-foreground">Per Annum</span>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {formatSalary(job.salaryMin, job.salaryMax)}
                    </div>
                  </div>

                  {/* AI Match Score */}
                  {job.aiMatch > 80 && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium">AI Match Score</span>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block text-accent">
                              {job.aiMatch}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-accent/20">
                          <div
                            style={{ width: `${job.aiMatch}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-accent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Application Deadline */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Application Deadline</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(job.deadline)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {job.easyApply ? (
                      <Button className="w-full" size="lg">
                        Apply Now
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" size="lg" asChild>
                        <a href={`/jobs/${job.id}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Apply on Company Site
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => toggleSaveJob(jobId)}
                    >
                      {isSaved ? (
                        <>
                          <BookmarkCheck className="h-4 w-4 mr-2" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save Job
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Share and Report */}
                  <div className="flex space-x-2 pt-4 border-t">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
