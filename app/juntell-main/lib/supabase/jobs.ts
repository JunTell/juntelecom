import { createClient } from './server'
import { Job } from '@/types'

/**
 * 모든 활성화된 채용공고를 가져옵니다
 */
export async function getActiveJobs(): Promise<Job[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')
    .order('posted_at', { ascending: false })

  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }

  return data || []
}

/**
 * 특정 채용공고를 ID로 가져옵니다
 */
export async function getJobById(id: string): Promise<Job | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .eq('status', 'active')
    .single()

  if (error) {
    console.error('Error fetching job:', error)
    return null
  }

  // 조회수 증가
  if (data) {
    await supabase
      .from('jobs')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', id)
  }

  return data
}

/**
 * 필터링 및 검색된 채용공고를 가져옵니다
 */
export async function getFilteredJobs(filters: {
  searchQuery?: string
  department?: string
  location?: string
  employmentType?: string
  experienceLevel?: string
}): Promise<Job[]> {
  const supabase = await createClient()

  let query = supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')

  // 검색어 필터
  if (filters.searchQuery && filters.searchQuery.trim()) {
    const searchTerm = `%${filters.searchQuery.trim()}%`
    query = query.or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
  }

  // 부서 필터
  if (filters.department && filters.department !== '전체') {
    query = query.eq('department', filters.department)
  }

  // 근무지 필터
  if (filters.location && filters.location !== '전체') {
    query = query.eq('location', filters.location)
  }

  // 고용형태 필터
  if (filters.employmentType && filters.employmentType !== '전체') {
    query = query.eq('employment_type', filters.employmentType)
  }

  // 경력 필터
  if (filters.experienceLevel && filters.experienceLevel !== '전체') {
    query = query.eq('experience_level', filters.experienceLevel)
  }

  const { data, error } = await query.order('is_featured', { ascending: false }).order('posted_at', { ascending: false })

  if (error) {
    console.error('Error fetching filtered jobs:', error)
    return []
  }

  return data || []
}

/**
 * 부서 목록을 가져옵니다
 */
export async function getDepartments(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('jobs')
    .select('department')
    .eq('status', 'active')

  if (error) {
    console.error('Error fetching departments:', error)
    return []
  }

  const departments = [...new Set(data.map((item) => item.department))]
  return departments.filter(Boolean).sort()
}

/**
 * 근무지 목록을 가져옵니다
 */
export async function getLocations(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('jobs')
    .select('location')
    .eq('status', 'active')

  if (error) {
    console.error('Error fetching locations:', error)
    return []
  }

  const locations = [...new Set(data.map((item) => item.location))]
  return locations.filter(Boolean).sort()
}

/**
 * 고용형태 목록을 가져옵니다
 */
export async function getEmploymentTypes(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('jobs')
    .select('employment_type')
    .eq('status', 'active')

  if (error) {
    console.error('Error fetching employment types:', error)
    return []
  }

  const types = [...new Set(data.map((item) => item.employment_type))]
  return types.filter(Boolean).sort()
}

/**
 * 추천 채용공고를 가져옵니다
 */
export async function getFeaturedJobs(limit: number = 3): Promise<Job[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')
    .eq('is_featured', true)
    .order('posted_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured jobs:', error)
    return []
  }

  return data || []
}

/**
 * 특정 태그를 가진 채용공고를 가져옵니다
 */
export async function getJobsByTag(tag: string): Promise<Job[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')
    .contains('tags', [tag])
    .order('posted_at', { ascending: false })

  if (error) {
    console.error('Error fetching jobs by tag:', error)
    return []
  }

  return data || []
}
