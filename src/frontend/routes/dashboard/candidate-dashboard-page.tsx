'use client'

import { useState } from 'react'
import { Button } from '@/frontend/components/ui/button'
import { Badge } from '@/frontend/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/frontend/components/ui/card'
import { Progress } from '@/frontend/components/ui/progress'
import { 
  User, 
  Briefcase, 
  Eye, 
  Phone,
  TrendingUp,
  BookOpen,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react'
import { Navbar } from '@/frontend/components/shared/navbar'
import { Footer } from '@/frontend/components/shared/footer'
import { DashboardSidebar } from '@/frontend/components/dashboard/dashboard-sidebar'
import { jobs } from '@/frontend/lib/mock-data'
import { formatDate } from '@/frontend/lib/utils'
import { cn } from '@/frontend/lib/utils'

export default function CandidateDashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const stats = {
    applicationsSent: 12,
    profileViews: 156,
    interviewCalls: 8,
    offers: 3
  }

  const profileCompleteness = 85

  const recentActivity = [
    {
      id: 1,
      type: 'application',
      title: 'Applied to Senior Frontend Developer',
      company: 'TechMahindra',
      date: '2024-04-15',
      status: 'under-review'
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview scheduled',
      company: 'Flipkart',
      date: '2024-04-14',
      status: 'scheduled'
    },
    {
      id: 3,
      type: 'view',
      title: 'Profile viewed by',
      company: 'Swiggy',
      date: '2024-04-13',
      status: 'viewed'
    },
    {
      id: 4,
      type: 'saved',
      title: 'Saved job',
      company: 'Zomato',
      date: '2024-04-12',
      status: 'saved'
    }
  ]

  const aiMatches = jobs
    .filter(job => job.aiMatch > 80)
    .slice(0, 3)

  const skillRecommendations = [
    { skill: 'React.js', level: 'Advanced', demand: 'High' },
    { skill: 'TypeScript', level: 'Intermediate', demand: 'Very High' },
    { skill: 'AWS', level: 'Beginner', demand: 'High' },
    { skill: 'GraphQL', level: 'Beginner', demand: 'Medium' }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application': return Briefcase
      case 'interview': return Phone
      case 'view': return Eye
      case 'saved': return FileText
      default: return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under-review': return 'text-yellow-600 bg-yellow-100'
      case 'scheduled': return 'text-blue-600 bg-blue-100'
      case 'viewed': return 'text-green-600 bg-green-100'
      case 'saved': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <DashboardSidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed top-20 left-4 z-30"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <User className="h-5 w-5" />
        </Button>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Rahul!</h1>
              <p className="text-muted-foreground">
                Here's what's happening with your job search today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Applications Sent</p>
                      <p className="text-2xl font-bold">{stats.applicationsSent}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                      <p className="text-2xl font-bold">{stats.profileViews}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Interview Calls</p>
                      <p className="text-2xl font-bold">{stats.interviewCalls}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Offers</p>
                      <p className="text-2xl font-bold">{stats.offers}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Target className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Completeness & Activity */}
              <div className="lg:col-span-2 space-y-6">
                {/* Profile Completeness */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Profile Completeness</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm font-bold text-primary">{profileCompleteness}%</span>
                    </div>
                    <Progress value={profileCompleteness} className="h-2" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Basic Info</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Education</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span>Resume</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Complete Profile
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => {
                        const Icon = getActivityIcon(activity.type)
                        return (
                          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                            <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{activity.title}</p>
                              <p className="text-xs text-muted-foreground">{activity.company}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(activity.date)}
                                </span>
                                <Badge 
                                  variant="secondary" 
                                  className={cn("text-xs", getStatusColor(activity.status))}
                                >
                                  {activity.status.replace('-', ' ')}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Matches & Skills */}
              <div className="space-y-6">
                {/* AI Job Matches */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>AI Job Matches</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiMatches.map((job) => (
                      <div key={job.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm line-clamp-1">{job.title}</h4>
                          <Badge variant="accent" className="text-xs">
                            {job.aiMatch}% match
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{job.company}</p>
                        <p className="text-xs text-primary font-medium">
                          ₹{(job.salaryMin / 100000).toFixed(1)}L - ₹{(job.salaryMax / 100000).toFixed(1)}L
                        </p>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">
                      View All Matches
                    </Button>
                  </CardContent>
                </Card>

                {/* Skill Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Recommended Skills</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {skillRecommendations.map((skill) => (
                      <div key={skill.skill} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{skill.skill}</span>
                          <Badge variant="outline" className="text-xs">
                            {skill.demand}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{skill.level}</span>
                          <span>High demand</span>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">
                      Upgrade Skills
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
