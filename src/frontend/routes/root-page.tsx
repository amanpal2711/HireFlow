'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Navbar } from '@/frontend/components/shared/navbar'
import { Footer } from '@/frontend/components/shared/footer'
import { HeroSection } from '@/frontend/components/home/hero-section'
import { TrendingJobs } from '@/frontend/components/home/trending-jobs'
import TopCompanies from '@/frontend/components/home/top-companies'
import { FeaturesSection } from '@/frontend/components/home/features-section'

export default function RootPage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return
    
    if (isSignedIn) {
      router.push('/candidate')
    }
  }, [isSignedIn, isLoaded, router])

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If user is signed in, show loading (will redirect)
  if (isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show marketing homepage for unauthenticated users
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TrendingJobs trendingJobs={[]} />
        <TopCompanies />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
