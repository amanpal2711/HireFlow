'use client'

import { useState } from 'react'
import { Button } from '@/frontend/components/ui/button'
import { Input } from '@/frontend/components/ui/input'
import { Badge } from '@/frontend/components/ui/badge'
import { Card, CardContent } from '@/frontend/components/ui/card'
import { 
  Search, 
  TrendingUp, 
  DollarSign,
  MapPin,
  Briefcase,
  BarChart3,
  Users
} from 'lucide-react'
import { Navbar } from '@/frontend/components/shared/navbar'
import { Footer } from '@/frontend/components/shared/footer'
import { locations } from '@/frontend/lib/mock-data'
import { formatSalary } from '@/frontend/lib/utils'

export default function SalariesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const topRoles = [
    { role: 'Software Engineer', avgSalary: 1800000, growth: '+12%' },
    { role: 'Product Manager', avgSalary: 2500000, growth: '+15%' },
    { role: 'Data Scientist', avgSalary: 2200000, growth: '+18%' },
    { role: 'UX Designer', avgSalary: 1500000, growth: '+10%' },
    { role: 'DevOps Engineer', avgSalary: 2000000, growth: '+14%' },
    { role: 'Full Stack Developer', avgSalary: 1700000, growth: '+11%' }
  ]

  const salaryByExperience = [
    { level: 'Entry Level (0-2 yrs)', avg: 800000, range: '₹6L - ₹12L' },
    { level: 'Mid Level (2-5 yrs)', avg: 1500000, range: '₹12L - ₹20L' },
    { level: 'Senior Level (5-8 yrs)', avg: 2500000, range: '₹20L - ₹35L' },
    { level: 'Lead/Manager (8+ yrs)', avg: 3500000, range: '₹30L - ₹50L+' }
  ]

  const cityWiseSalaries = [
    { city: 'Bengaluru', avgSalary: 2200000, jobs: 15000, color: 'bg-blue-500' },
    { city: 'Mumbai', avgSalary: 2000000, jobs: 12000, color: 'bg-green-500' },
    { city: 'Delhi NCR', avgSalary: 1800000, jobs: 10000, color: 'bg-purple-500' },
    { city: 'Pune', avgSalary: 1600000, jobs: 8000, color: 'bg-orange-500' },
    { city: 'Hyderabad', avgSalary: 1900000, jobs: 9000, color: 'bg-red-500' },
    { city: 'Chennai', avgSalary: 1400000, jobs: 6000, color: 'bg-yellow-500' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Salary Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover salary trends, compare compensation packages, and make informed career decisions.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-background rounded-lg shadow-lg p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Software Engineer at Google..."
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
                    className="flex h-10 w-full rounded-md border-0 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 appearance-none cursor-pointer"
                  >
                    <option value="">All locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <Button size="lg" className="px-8">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Salary Roles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Paying Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRoles.map((role) => (
              <Card key={role.role} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{role.role}</h3>
                      <p className="text-2xl font-bold text-primary">
                        {formatSalary(role.avgSalary, role.avgSalary)}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {role.growth}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average annual compensation
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Salary Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Salary Comparison</h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-semibold">Role</th>
                      <th className="text-left p-4 font-semibold">Avg Base</th>
                      <th className="text-left p-4 font-semibold">Avg Total</th>
                      <th className="text-left p-4 font-semibold">Range</th>
                      <th className="text-left p-4 font-semibold">Submissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topRoles.map((role) => (
                      <tr key={role.role} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-medium">{role.role}</td>
                        <td className="p-4">{formatSalary(role.avgSalary * 0.8, role.avgSalary * 0.8)}</td>
                        <td className="p-4 font-medium text-primary">
                          {formatSalary(role.avgSalary, role.avgSalary)}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          ₹{(role.avgSalary * 0.7 / 100000).toFixed(1)}L - ₹{(role.avgSalary * 1.3 / 100000).toFixed(1)}L
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{role.role === 'Software Engineer' ? 245 : role.role === 'Product Manager' ? 189 : role.role === 'Data Scientist' ? 167 : 134}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Salary by Experience */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Salary by Experience</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {salaryByExperience.map((item) => (
                    <div key={item.level} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.level}</span>
                        <span className="text-primary font-semibold">
                          {formatSalary(item.avg, item.avg)}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                          style={{ width: `${(item.avg / 3500000) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Typical range: {item.range}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* City-wise Salary Heatmap */}
          <section>
            <h2 className="text-2xl font-bold mb-6">City-wise Salaries</h2>
            <div className="grid grid-cols-2 gap-4">
              {cityWiseSalaries.map((city) => (
                <Card key={city.city} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{city.city}</h3>
                      <div className={`h-3 w-3 rounded-full ${city.color}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg font-bold text-primary">
                        {formatSalary(city.avgSalary, city.avgSalary)}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Briefcase className="h-3 w-3" />
                          <span>{city.jobs.toLocaleString()} jobs</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BarChart3 className="h-3 w-3" />
                          <span>High demand</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Submit Salary CTA */}
        <section>
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-0">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">
                  Share Your Salary Information
                </h2>
                <p className="text-muted-foreground mb-6">
                  Help the community make better career decisions by sharing anonymous salary data. 
                  Your contribution helps thousands of job seekers negotiate better compensation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    Submit Salary Data
                  </Button>
                  <Button variant="outline" size="lg" className="px-8">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
