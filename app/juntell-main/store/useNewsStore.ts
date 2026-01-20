import { create } from 'zustand'
import { News } from '@/types'

interface NewsState {
  news: News[]
  selectedNews: News | null
  isLoading: boolean
  error: string | null
  filters: {
    category?: string
    tag?: string
  }
  setNews: (news: News[]) => void
  setSelectedNews: (news: News | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (filters: NewsState['filters']) => void
  clearFilters: () => void
}

export const useNewsStore = create<NewsState>((set) => ({
  news: [],
  selectedNews: null,
  isLoading: false,
  error: null,
  filters: {},
  setNews: (news) => set({ news }),
  setSelectedNews: (news) => set({ selectedNews: news }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: {} }),
}))
