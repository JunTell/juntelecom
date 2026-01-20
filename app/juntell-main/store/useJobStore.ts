import { create } from 'zustand'
import { Job } from '@/types'

interface JobState {
  jobs: Job[]
  selectedJob: Job | null
  isLoading: boolean
  error: string | null
  filters: {
    department?: string
    location?: string
    employmentType?: string
    experienceLevel?: string
  }
  setJobs: (jobs: Job[]) => void
  setSelectedJob: (job: Job | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (filters: JobState['filters']) => void
  clearFilters: () => void
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  selectedJob: null,
  isLoading: false,
  error: null,
  filters: {},
  setJobs: (jobs) => set({ jobs }),
  setSelectedJob: (job) => set({ selectedJob: job }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: {} }),
}))
