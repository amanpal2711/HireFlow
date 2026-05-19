'use client'

import { useState } from 'react'
import { Button } from '@/frontend/components/ui/button'
import { Input } from '@/frontend/components/ui/input'
import { Badge } from '@/frontend/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/frontend/components/ui/card'
import { 
  Search, 
  MapPin, 
  Briefcase, 
  TrendingUp,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useFilterStore } from '@/frontend/store/filter-store'
import { categories, locations } from '@/frontend/lib/mock-data'
import { cn } from '@/frontend/lib/utils'

export function JobFilters() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['jobType', 'experience'])
  const {
    keyword,
    location,
    jobType,
    experience,
    salaryMin,
    salaryMax,
    datePosted,
    companySize,
    remote,
    setKeyword,
    setLocation,
    setJobType,
    setExperience,
    setSalaryRange,
    setDatePosted,
    setCompanySize,
    setRemote,
    clearAllFilters
  } = useFilterStore()

  const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' }
  ]

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead/Manager' }
  ]

  const datePostedOptions = [
    { value: '', label: 'Any time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'month', label: 'This month' }
  ]

  const companySizes = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ]

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const hasActiveFilters = keyword || location || jobType.length > 0 || experience.length > 0 || 
    salaryMin > 0 || salaryMax < 5000000 || datePosted || companySize.length > 0 || remote

  return (
    <Card className="h-fit sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Filters
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Keywords</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Job title, skills..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 appearance-none cursor-pointer"
            >
              <option value="">All locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <button
            onClick={() => toggleSection('jobType')}
            className="flex items-center justify-between w-full text-sm font-medium"
          >
            Job Type
            {expandedSections.includes('jobType') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {expandedSections.includes('jobType') && (
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={jobType.includes(type.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setJobType([...jobType, type.value])
                      } else {
                        setJobType(jobType.filter(t => t !== type.value))
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{type.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <button
            onClick={() => toggleSection('experience')}
            className="flex items-center justify-between w-full text-sm font-medium"
          >
            Experience Level
            {expandedSections.includes('experience') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {expandedSections.includes('experience') && (
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <label key={level.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={experience.includes(level.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setExperience([...experience, level.value])
                      } else {
                        setExperience(experience.filter(e => e !== level.value))
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{level.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Salary Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Salary Range (LPA)</label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={salaryMin === 0 ? '' : Math.round(salaryMin / 100000)}
                onChange={(e) => setSalaryRange(
                  (parseInt(e.target.value) || 0) * 100000,
                  salaryMax
                )}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={salaryMax === 5000000 ? '' : Math.round(salaryMax / 100000)}
                onChange={(e) => setSalaryRange(
                  salaryMin,
                  (parseInt(e.target.value) || 50) * 100000
                )}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Date Posted */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Posted</label>
          <select
            value={datePosted}
            onChange={(e) => setDatePosted(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer"
          >
            {datePostedOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Remote Toggle */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remote}
              onChange={(e) => setRemote(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium">Remote only</span>
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
