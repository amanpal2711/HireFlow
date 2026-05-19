import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/frontend/lib/mock-data'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: Omit<User, 'id'>) => Promise<boolean>
  updateProfile: (data: Partial<User['profile']>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock authentication - in real app, this would call an API
        if (email === 'candidate@example.com' && password === 'password') {
          const user: User = {
            id: '1',
            name: 'Rahul Sharma',
            email: 'candidate@example.com',
            role: 'candidate',
            profile: {
              title: 'Senior Frontend Developer',
              location: 'Bengaluru, Karnataka',
              experience: '5 years',
              skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
              bio: 'Passionate frontend developer with 5+ years of experience building scalable web applications.'
            }
          }
          set({ user, isAuthenticated: true })
          return true
        }
        
        if (email === 'employer@example.com' && password === 'password') {
          const user: User = {
            id: '2',
            name: 'Priya Patel',
            email: 'employer@example.com',
            role: 'employer',
            profile: {
              title: 'HR Manager',
              location: 'Mumbai, Maharashtra',
              company: 'TechCorp India'
            }
          }
          set({ user, isAuthenticated: true })
          return true
        }
        
        return false
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      register: async (userData: Omit<User, 'id'>) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const newUser: User = {
          ...userData,
          id: Date.now().toString()
        }
        
        set({ user: newUser, isAuthenticated: true })
        return true
      },

      updateProfile: (data: Partial<User['profile']>) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              profile: {
                ...currentUser.profile,
                ...data
              }
            }
          })
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
