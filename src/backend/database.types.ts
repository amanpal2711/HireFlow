export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          role: 'candidate' | 'employer'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role: 'candidate' | 'employer'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id: string
          name?: string
          email?: string
          role?: 'candidate' | 'employer'
          avatar_url?: string | null
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          website: string
          industry: string
          size: string
          hq: string
          founded: number
          description: string
          rating: number
          review_count: number
          followers: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          website: string
          industry: string
          size: string
          hq: string
          founded: number
          description: string
          rating?: number
          review_count?: number
          followers?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id: string
          name?: string
          website?: string
          industry?: string
          size?: string
          hq?: string
          founded?: number
          description?: string
          rating?: number
          review_count?: number
          followers?: number
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          type: 'full-time' | 'part-time' | 'contract' | 'internship'
          experience: 'entry' | 'mid' | 'senior' | 'lead'
          salary_min: number
          salary_max: number
          description: string
          requirements: string[]
          responsibilities: string[]
          skills: string[]
          remote: boolean
          easy_apply: boolean
          ai_match: number
          deadline: string
          posted_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location: string
          type: 'full-time' | 'part-time' | 'contract' | 'internship'
          experience: 'entry' | 'mid' | 'senior' | 'lead'
          salary_min: number
          salary_max: number
          description: string
          requirements: string[]
          responsibilities: string[]
          skills: string[]
          remote?: boolean
          easy_apply?: boolean
          ai_match?: number
          deadline?: string
          posted_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id: string
          title?: string
          company?: string
          location?: string
          type?: 'full-time' | 'part-time' | 'contract' | 'internship'
          experience?: 'entry' | 'mid' | 'senior' | 'lead'
          salary_min?: number
          salary_max?: number
          description?: string
          requirements?: string[]
          responsibilities?: string[]
          skills?: string[]
          remote?: boolean
          easy_apply?: boolean
          ai_match?: number
          deadline?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          user_id: string
          job_id: string
          status: 'pending' | 'under-review' | 'interview' | 'accepted' | 'rejected'
          applied_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_id: string
          status?: 'pending' | 'under-review' | 'interview' | 'accepted' | 'rejected'
          applied_at?: string
          updated_at?: string
        }
        Update: {
          id: string
          user_id?: string
          job_id?: string
          status?: 'pending' | 'under-review' | 'interview' | 'accepted' | 'rejected'
          applied_at?: string
          updated_at?: string
        }
      }
      saved_jobs: {
        Row: {
          id: string
          user_id: string
          job_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_id: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          company_id: string
          user_id: string
          rating: number
          role: string
          pros: string[]
          cons: string[]
          helpful: number
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          user_id: string
          rating: number
          role: string
          pros: string[]
          cons: string[]
          helpful?: number
          created_at?: string
        }
      }
      salaries: {
        Row: {
          id: string
          company_id: string
          role: string
          experience: string
          base: number
          total: number
          location: string
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          role: string
          experience: string
          base: number
          total: number
          location: string
          created_at?: string
        }
      }
      job_alerts: {
        Row: {
          id: string
          user_id: string
          title: string
          keywords: string
          location: string
          job_type: string
          experience: string
          salary_min: number
          salary_max: number
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          keywords: string
          location: string
          job_type: string
          experience: string
          salary_min: number
          salary_max: number
          active?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
