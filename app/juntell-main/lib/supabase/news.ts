import { createClient } from './server'
import { News } from '@/types'

/**
 * 모든 발행된 뉴스를 가져옵니다
 */
export async function getPublishedNews(limit?: number): Promise<News[]> {
  const supabase = await createClient()

  let query = supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return data || []
}

/**
 * 특정 뉴스를 ID로 가져옵니다
 */
export async function getNewsById(id: string): Promise<News | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching news:', error)
    return null
  }

  // 조회수 증가
  await incrementNewsViews(id)

  return data
}

/**
 * slug로 뉴스를 가져옵니다
 */
export async function getNewsBySlug(slug: string): Promise<News | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }

  // 조회수 증가
  if (data) {
    await incrementNewsViews(data.id)
  }

  return data
}

/**
 * 카테고리별 뉴스를 가져옵니다
 */
export async function getNewsByCategory(category: string): Promise<News[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('category', category)
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching news by category:', error)
    return []
  }

  return data || []
}

/**
 * 뉴스 조회수를 증가시킵니다
 */
async function incrementNewsViews(id: string): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.rpc('increment_news_views', { news_id: id })

  if (error) {
    console.error('Error incrementing news views:', error)
  }
}

/**
 * 카테고리 목록을 가져옵니다
 */
export async function getNewsCategories(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news')
    .select('category')
    .eq('is_published', true)

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  const categories = [...new Set(data.map((item) => item.category))]
  return categories.filter(Boolean)
}
