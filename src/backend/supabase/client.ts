import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://wyayswgiivpuwyeazdsl.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5YXlzd2dpaXZwdXd5ZWF6ZHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NDM2NDQsImV4cCI6MjA5MjExOTY0NH0.E0DBGy5pv4ZGGSFPuWcPWzJWv6adkMG7UFeGd46KtTo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)