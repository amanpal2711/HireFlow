import { Database } from '@/backend/database.types'

// Types for our database tables
export type Job = Database['public']['Tables']['jobs']['Row']
export type Company = Database['public']['Tables']['companies']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Application = Database['public']['Tables']['applications']['Row']
export type SavedJob = Database['public']['Tables']['saved_jobs']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Salary = Database['public']['Tables']['salaries']['Row']
export type JobAlert = Database['public']['Tables']['job_alerts']['Row']

import { supabase } from './client'

// Job Queries
export async function getJobs(limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('posted_date', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data || []
}

export async function getJobsWithFilters(filters: {
  city?: string
  job_type?: string
  experience_level?: string
  salary_min?: number
  salary_max?: number
}) {
  // Direct supabase usage - no dynamic import needed
  let query = supabase
    .from('jobs')
    .select('*')
    .order('posted_date', { ascending: false })

  // Apply filters
  if (filters.city) {
    query = query.ilike('location', `%${filters.city}%`)
  }
  if (filters.job_type) {
    query = query.eq('type', filters.job_type)
  }
  if (filters.experience_level) {
    query = query.eq('experience', filters.experience_level)
  }
  if (filters.salary_min) {
    query = query.gte('salary_min', filters.salary_min)
  }
  if (filters.salary_max) {
    query = query.lte('salary_max', filters.salary_max)
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

export async function getJobById(id: string) {
  // Direct supabase usage - no dynamic import needed
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getTrendingJobs(limit = 6) {
  // Direct supabase usage - no dynamic import needed
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .limit(limit)

  if (error) throw error
  return data || []
}

// Company Queries
export async function getCompanies(limit = 10, offset = 0) {
  // Direct supabase usage - no dynamic import needed
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data || []
}

export async function getCompanyById(id: string) {
  // Direct supabase usage - no dynamic import needed
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getCompanyWithJobs(id: string) {
  // Direct supabase usage - no dynamic import needed
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('*')
    .eq('id', id)
    .single()

  if (companyError) throw companyError

  const { data: companyJobs, error: jobsError } = await supabase
    .from('jobs')
    .select('*')
    .eq('company', (company as Company | null)?.name || '')
    .order('posted_date', { ascending: false })
    .limit(10)

  if (jobsError) throw jobsError

  return {
    company,
    jobs: companyJobs || []
  }
}

// Profile Queries
export async function getProfile(userId: string) {
  // Direct supabase usage - no dynamic import needed
  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return profileData
}

export async function updateProfile(userId: string, data: Partial<Profile>) {
  // Direct supabase usage - no dynamic import needed
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', userId)

  if (error) throw error
  return data
}

// Application Queries
export async function getApplications(userId: string) {
  // Direct supabase usage - no dynamic import needed
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', userId)
    .order('applied_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function submitApplication(userId: string, jobId: string) {
  // Direct supabase usage - no dynamic import needed
  const { data: applicationData, error } = await supabase
    .from('applications')
    .insert({
      user_id: userId,
      job_id: jobId,
      status: 'pending'
    })
    .select()
    .single()

  if (error) throw error
  return applicationData
}

// Saved Jobs Queries
export async function getSavedJobs(userId: string) {
  // Direct supabase usage - no dynamic import needed
  const { data, error } = await supabase
    .from('saved_jobs')
    .select(`
      *,
      jobs(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function saveJob(userId: string, jobId: string) {
  // Direct supabase usage - no dynamic import needed
  const { data: savedJobData, error } = await supabase
    .from('saved_jobs')
    .insert({
      user_id: userId,
      job_id: jobId
    })
    .select()
    .single()

  if (error) throw error
  return savedJobData
}

export async function unsaveJob(userId: string, jobId: string) {
  // Direct supabase usage - no dynamic import needed
  const { error } = await supabase
    .from('saved_jobs')
    .delete()
    .eq('user_id', userId)
    .eq('job_id', jobId)

  if (error) throw error
  return true
}

// Review Queries
export async function getCompanyReviews(companyId: string) {
  // Direct supabase usage - no dynamic import needed
  const { data: reviewData, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return reviewData || []
}

export async function submitReview(companyId: string, userId: string, data: Omit<Review, 'id' | 'company_id' | 'user_id' | 'created_at'>) {
  // Direct supabase usage - no dynamic import needed
  const { data: reviewData, error } = await supabase
    .from('reviews')
    .insert({
      company_id: companyId,
      user_id: userId,
      ...data
    })
    .select()
    .single()

  if (error) throw error
  return reviewData
}

// Salary Queries
export async function getSalaryData(companyId?: string) {
  // Direct supabase usage - no dynamic import needed
  let salaryQuery = supabase
    .from('salaries')
    .select('*')
    .order('created_at', { ascending: false })

  if (companyId) {
    salaryQuery = salaryQuery.eq('company_id', companyId)
  }

  const { data, error } = await salaryQuery
  if (error) throw error
  return data || []
}

export async function submitSalaryData(companyId: string, userId: string, data: Omit<Salary, 'id' | 'company_id' | 'created_at'>) {
  // Direct supabase usage - no dynamic import needed
  const { data: salaryData, error } = await supabase
    .from('salaries')
    .insert({
      company_id: companyId,
      user_id: userId,
      ...data
    })
    .select()
    .single()

  if (error) throw error
  return salaryData
}

// Job Alert Queries
export async function getJobAlerts(userId: string) {
  // Direct supabase usage - no dynamic import needed
  const { data, error } = await supabase
    .from('job_alerts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createJobAlert(userId: string, data: Omit<JobAlert, 'id' | 'user_id' | 'created_at'>) {
  // Direct supabase usage - no dynamic import needed
  const { data: alertData, error } = await supabase
    .from('job_alerts')
    .insert({
      user_id: userId,
      ...data
    })
    .select()
    .single()

  if (error) throw error
  return alertData
}
