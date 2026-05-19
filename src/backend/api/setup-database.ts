import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function POST(): Promise<NextResponse> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://wyayswgiivpuwyeazdsl.supabase.co'
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5YXlzd2dpaXZwdXd5ZWF6ZHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NDM2NDQsImV4cCI6MjA5MjExOTY0NH0.E0DBGy5pv4ZGGSFPuWcPWzJWv6adkMG7UFeGd46KtTo'
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Read and execute setup SQL
    const sqlPath = join(process.cwd(), 'database', 'setup-jobs.sql')
    const sqlContent = readFileSync(sqlPath, 'utf8')
    
    // Execute SQL using Supabase SQL RPC (if available) or provide instructions
    const { data, error } = await supabase
      .from('jobs')
      .select('count')
      .limit(1)
    
    if (error && error.message?.includes('does not exist')) {
      return NextResponse.json({
        success: false,
        error: 'TABLES_NOT_FOUND',
        message: 'Database tables do not exist. Please run the SQL setup manually.',
        sqlContent: sqlContent,
        instructions: [
          '1. Go to your Supabase dashboard',
          '2. Navigate to SQL Editor',
          '3. Copy the entire content from database/setup-jobs.sql',
          '4. Paste and run the SQL script',
          '5. Restart your development server'
        ]
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tables exist',
      tableCount: 1
    })
    
  } catch (err: unknown) {
    return NextResponse.json({
      success: false,
      error: 'SETUP_ERROR',
      message: err instanceof Error ? err.message : 'Unknown error occurred'
    })
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: 'Use POST to run database setup check',
    instructions: 'Send POST request to this endpoint to check if database tables exist'
  })
}
