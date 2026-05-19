'use client'

import { Card, CardContent } from '@/frontend/components/ui/card'
import { 
  Brain, 
  TrendingUp, 
  Star,
  Zap,
  Shield,
  Globe
} from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI Match',
      description: 'Our advanced AI algorithms match you with jobs that perfectly fit your skills and preferences.',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: TrendingUp,
      title: 'Salary Insights',
      description: 'Get real-time salary data and insights to negotiate better compensation packages.',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: Star,
      title: 'Company Reviews',
      description: 'Read authentic reviews and ratings from current and former employees.',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    },
    {
      icon: Zap,
      title: 'Easy Apply',
      description: 'Apply to multiple jobs with just one click using your profile.',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: Shield,
      title: 'Verified Jobs',
      description: 'All job listings are verified to ensure authenticity and prevent scams.',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
    {
      icon: Globe,
      title: 'Remote Opportunities',
      description: 'Discover remote work opportunities from top companies across India.',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20'
    }
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose HireFlow?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine cutting-edge technology with human expertise to make your job search 
            experience seamless and effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-0 shadow-none hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`mx-auto h-16 w-16 rounded-2xl ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Find Your Dream Job?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join millions of job seekers who have found their perfect match through HireFlow. 
              Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Start Job Search
              </button>
              <button className="px-8 py-3 bg-background border border-input rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors font-medium">
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
