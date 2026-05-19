'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/backend/supabase/client'
import Link from 'next/link'
import { Button } from '@/frontend/components/ui/button'
import { Badge } from '@/frontend/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/frontend/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/frontend/components/ui/tabs'
import { JobCard } from '@/frontend/components/shared/job-card'
import { 
  MapPin, 
  Building, 
  Users, 
  Calendar,
  Star,
  Globe,
  Heart,
  Briefcase,
  DollarSign,
  TrendingUp,
  Award,
  Coffee,
  Wifi,
  Car,
  Home,
  HeartHandshake
} from 'lucide-react'
import { Navbar } from '@/frontend/components/shared/navbar'
import { Footer } from '@/frontend/components/shared/footer'
import { formatSalary, formatDate } from '@/frontend/lib/utils'
import { cn } from '@/frontend/lib/utils'

interface Company {
  id: string
  name: string
  slug: string
  logo_url?: string
  headquarters: string
  founded: string
  size: string
  hq: string
  industry: string
  website: string
  rating: number
  reviewCount: number
  followers: number
  description: string
  culture: string[]
}

interface Job {
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

export default function CompanyProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)
  const companyId = params.id as string

  const [company, setCompany] = useState<any>(null)
  const [companyJobs, setCompanyJobs] = useState<Job[]>([])
  const [companyReviews, setCompanyReviews] = useState<any[]>([])
  const [companySalaries, setCompanySalaries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Fetch company data
        const { data: companyData } = await supabase
          .from('companies')
          .select('*')
          .eq('id', companyId)
          .single()
        
        if (companyData) {
          setCompany(companyData)
          
          // Fetch company jobs
          const { data: jobsData } = await supabase
            .from('jobs')
            .select('*')
            .eq('company_id', companyId)
          
          setCompanyJobs(jobsData || [])
        }
      } catch (error) {
        console.error('Error fetching company data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCompanyData()
  }, [companyId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading company information...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The company you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.push('/companies')}>
            Back to Companies
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  const benefits = [
    { icon: HeartHandshake, label: 'Health Insurance' },
    { icon: Coffee, label: 'Free Meals' },
    { icon: Wifi, label: 'WiFi Access' },
    { icon: Car, label: 'Transport' },
    { icon: Home, label: 'Work From Home' },
    { icon: Award, label: 'Performance Bonus' }
  ]

  const ratingBreakdown = [
    { category: 'Culture', rating: 4.2 },
    { category: 'Work-Life', rating: 3.8 },
    { category: 'Management', rating: 4.0 },
    { category: 'Pay', rating: 4.1 },
    { category: 'Growth', rating: 3.9 }
  ]

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Company Hero */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-2xl bg-primary/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {company.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{company.rating}</span>
                    <span>({company.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <span>•</span>
                  <span>{company.followers.toLocaleString()} followers</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleFollow}
                className="flex items-center space-x-2"
              >
                {isFollowing ? (
                  <>
                    <Heart className="h-4 w-4 fill-current" />
                    Following
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4" />
                    Follow
                  </>
                )}
              </Button>
              <Button>
                View Jobs
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8 pt-8 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Building className="h-4 w-4" />
                <span className="text-sm">Founded</span>
              </div>
              <div className="text-lg font-semibold mt-1">{company.founded}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">Size</span>
              </div>
              <div className="text-lg font-semibold mt-1">{company.size}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">HQ</span>
              </div>
              <div className="text-lg font-semibold mt-1">{company.hq}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm">Industry</span>
              </div>
              <div className="text-lg font-semibold mt-1">{company.industry}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span className="text-sm">Website</span>
              </div>
              <div className="text-lg font-semibold mt-1">
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Visit
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="salaries">Salaries</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* About Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {company.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Culture & Values */}
                <Card>
                  <CardHeader>
                    <CardTitle>Culture & Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {company.culture?.map((value: string) => (
                        <div key={value} className="text-center p-4 bg-muted rounded-lg">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                            <span className="text-lg font-bold text-primary">
                              {value.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {benefits.map((benefit) => {
                        const Icon = benefit.icon
                        return (
                          <div key={benefit.label} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">{benefit.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Office Photos */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Office Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {company.photos?.map((photo: any, index: number) => (
                        <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-muted-foreground">Office Photo {index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            {companyJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Open Positions</h3>
                <p className="text-muted-foreground">
                  {company.name} doesn't have any open positions right now.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Rating Overview */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Rating</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{company.rating}</div>
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-5 w-5",
                            i < Math.floor(company.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {company.reviewCount.toLocaleString()} reviews
                    </p>
                  </CardContent>
                </Card>

                {/* Rating Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Rating Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {ratingBreakdown.map((item) => (
                      <div key={item.category} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.category}</span>
                          <span className="font-medium">{item.rating}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(item.rating / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-2 space-y-4">
                {companyReviews.map((review: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            {[...Array(5)].map((_, i: number) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                          <h4 className="font-semibold">{review.role}</h4>
                          <p className="text-sm text-muted-foreground">{formatDate(review.date)}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {review.helpful} helpful
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-green-600 mb-2">Pros</h5>
                          <ul className="space-y-1">
                            {review.pros?.map((pro: string, index: number) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                                <span className="text-green-600 mt-1">•</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-red-600 mb-2">Cons</h5>
                          <ul className="space-y-1">
                            {review.cons?.map((con: string, index: number) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                                <span className="text-red-600 mt-1">•</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {companyReviews.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Be the first to share your experience working at {company.name}.
                      </p>
                      <Button>Write a Review</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Salaries Tab */}
          <TabsContent value="salaries">
            <Card>
              <CardHeader>
                <CardTitle>Salary Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Experience</th>
                        <th className="text-left py-3 px-4">Base Salary</th>
                        <th className="text-left py-3 px-4">Total Compensation</th>
                        <th className="text-left py-3 px-4">Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companySalaries.map((salary: any, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{salary.role}</td>
                          <td className="py-3 px-4 text-muted-foreground">{salary.experience}</td>
                          <td className="py-3 px-4">{formatSalary(salary.base, salary.base)}</td>
                          <td className="py-3 px-4 font-medium">{formatSalary(salary.total, salary.total)}</td>
                          <td className="py-3 px-4 text-muted-foreground">{salary.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {companySalaries.length === 0 && (
                  <div className="text-center py-12">
                    <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Salary Data</h3>
                    <p className="text-muted-foreground mb-4">
                      Help others by sharing your salary information at {company.name}.
                    </p>
                    <Button>Submit Salary</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.photos.map((photo: any, index: number) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Office Photo {index + 1}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
