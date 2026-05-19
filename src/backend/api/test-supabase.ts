import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://wyayswgiivpuwyeazdsl.supabase.co'
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5YXlzd2dpaXZwdXd5ZWF6ZHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NDM2NDQsImV4cCI6MjA5MjExOTY0NH0.E0DBGy5pv4ZGGSFPuWcPWzJWv6adkMG7UFeGd46KtTo'
    
    console.log('Testing with URL:', supabaseUrl)
    console.log('Has anon key:', !!supabaseAnonKey)
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Test basic connection
    const { data, error } = await supabase.from('jobs').select('*').limit(1)
    
    if (error) {
      console.error('Supabase Error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error,
        envCheck: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseAnonKey
        }
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      data: data,
      count: data?.length || 0
    })
    
  } catch (err: unknown) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected error',
      details: err instanceof Error ? err.message : String(err)
    })
  }
}
