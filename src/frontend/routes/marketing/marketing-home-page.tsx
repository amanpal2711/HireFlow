import { Metadata } from 'next'
import { Navbar } from '@/frontend/components/shared/navbar'
import { Footer } from '@/frontend/components/shared/footer'
import { HeroSection } from '@/frontend/components/home/hero-section'
import { TrendingJobs } from '@/frontend/components/home/trending-jobs'
import TopCompanies from '@/frontend/components/home/top-companies'
import { FeaturesSection } from '@/frontend/components/home/features-section'
import { getTrendingJobs } from '@/backend/supabase/queries'

export const metadata: Metadata = {
  title: 'HireFlow - Find Your Dream Job in India | AI-Powered Job Platform',
  description: 'Discover 2M+ jobs from 50K+ companies in India. AI-powered matching, salary insights, company reviews, and more. Your perfect job awaits!',
  keywords: ['jobs in India', 'job search', 'career', 'employment', 'AI matching', 'salary insights'],
  openGraph: {
    title: 'HireFlow - Find Your Dream Job in India',
    description: 'AI-powered job platform connecting talent with opportunity across India',
    type: 'website',
    locale: 'en_IN',
  },
}

export default async function HomePage() {
  // Fetch trending jobs from Supabase with error handling
  let trendingJobs = []
  try {
    trendingJobs = await getTrendingJobs(6)
  } catch (error) {
    console.error('Error fetching trending jobs:', error)
    // Continue with empty array if fetch fails
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TrendingJobs trendingJobs={trendingJobs} />
        <TopCompanies />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
