import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FilterState {
  keyword: string
  location: string
  jobType: string[]
  experience: string[]
  salaryMin: number
  salaryMax: number
  datePosted: string
  companySize: string[]
  remote: boolean
  
  setKeyword: (keyword: string) => void
  setLocation: (location: string) => void
  setJobType: (jobType: string[]) => void
  setExperience: (experience: string[]) => void
  setSalaryRange: (min: number, max: number) => void
  setDatePosted: (datePosted: string) => void
  setCompanySize: (companySize: string[]) => void
  setRemote: (remote: boolean) => void
  clearAllFilters: () => void
  
  // Saved jobs
  savedJobs: string[]
  toggleSaveJob: (jobId: string) => void
  isJobSaved: (jobId: string) => boolean
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      keyword: '',
      location: '',
      jobType: [],
      experience: [],
      salaryMin: 0,
      salaryMax: 5000000,
      datePosted: '',
      companySize: [],
      remote: false,
      savedJobs: [],

      setKeyword: (keyword: string) => set({ keyword }),
      
      setLocation: (location: string) => set({ location }),
      
      setJobType: (jobType: string[]) => set({ jobType }),
      
      setExperience: (experience: string[]) => set({ experience }),
      
      setSalaryRange: (min: number, max: number) => set({ salaryMin: min, salaryMax: max }),
      
      setDatePosted: (datePosted: string) => set({ datePosted }),
      
      setCompanySize: (companySize: string[]) => set({ companySize }),
      
      setRemote: (remote: boolean) => set({ remote }),
      
      clearAllFilters: () => set({
        keyword: '',
        location: '',
        jobType: [],
        experience: [],
        salaryMin: 0,
        salaryMax: 5000000,
        datePosted: '',
        companySize: [],
        remote: false
      }),

      toggleSaveJob: (jobId: string) => {
        const { savedJobs } = get()
        if (savedJobs.includes(jobId)) {
          set({ savedJobs: savedJobs.filter(id => id !== jobId) })
        } else {
          set({ savedJobs: [...savedJobs, jobId] })
        }
      },

      isJobSaved: (jobId: string) => {
        const { savedJobs } = get()
        return savedJobs.includes(jobId)
      }
    }),
    {
      name: 'filter-storage'
    }
  )
)
