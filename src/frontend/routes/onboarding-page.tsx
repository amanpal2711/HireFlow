'use client'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/backend/supabase/client'

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()

  const selectRole = async (role: 'candidate' | 'employer') => {
    // Save role to Supabase profiles table
    await supabase
      .from('profiles')
      .upsert({
        id: user?.id,
        email: user?.emailAddresses[0]?.emailAddress,
        full_name: user?.fullName,
        avatar_url: user?.imageUrl,
        role: role
      })

    // Redirect based on role
    if (role === 'employer') {
      router.push('/dashboard/employer')
    } else {
      router.push('/dashboard/candidate')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to HireFlow!</h1>
        <p className="text-muted-foreground mb-8">
          Tell us how you want to use HireFlow
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => selectRole('candidate')}
            className="p-6 border-2 rounded-xl hover:border-primary 
                       hover:bg-primary/5 transition-all text-center"
          >
            <div className="text-4xl mb-3">👨‍💼</div>
            <div className="font-semibold text-lg">I am looking</div>
            <div className="font-semibold text-lg">for a job</div>
            <div className="text-sm text-muted-foreground mt-2">
              Find your dream job
            </div>
          </button>
          <button
            onClick={() => selectRole('employer')}
            className="p-6 border-2 rounded-xl hover:border-primary 
                       hover:bg-primary/5 transition-all text-center"
          >
            <div className="text-4xl mb-3">🏢</div>
            <div className="font-semibold text-lg">I am hiring</div>
            <div className="font-semibold text-lg">talent</div>
            <div className="text-sm text-muted-foreground mt-2">
              Post jobs and hire
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
