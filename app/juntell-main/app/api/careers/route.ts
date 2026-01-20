import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const supabase = await createClient()

  // URL에서 page, limit 쿼리 파라미터 파싱
  const { searchParams } = new URL(request.url)
  const pageParam = searchParams.get('page')
  const limitParam = searchParams.get('limit')

  let page = Number(pageParam ?? '1')
  let limit = Number(limitParam ?? '10')

  // 잘못된 값 들어오는 경우 기본값으로 보정
  if (!Number.isFinite(page) || page < 1) page = 1
  if (!Number.isFinite(limit) || limit < 1) limit = 10

  // limit 상한 (과도한 요청 방지)
  if (limit > 50) limit = 50

  const from = (page - 1) * limit
  const to = from + limit - 1

  // 추가 필터 파라미터
  const q = searchParams.get('q') ?? ''
  const department = searchParams.get('department') ?? ''
  const location = searchParams.get('location') ?? ''
  const employmentType = searchParams.get('employmentType') ?? ''

  let query = supabase
    .from('jobs')
    .select(
      'id, title, department, location, employment_type, experience_level, tags, posted_at',
      { count: 'exact' }
    )
    .eq('status', 'active')
    .order('is_featured', { ascending: false })
    .order('posted_at', { ascending: false })
    .range(from, to)

  if (q) {
    query = query.ilike('title', `%${q}%`)
  }

  if (department) {
    query = query.eq('department', department)
  }

  if (location) {
    query = query.eq('location', location)
  }

  if (employmentType) {
    query = query.eq('employment_type', employmentType)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching careers:', error)
    return NextResponse.json(
      { error: '채용공고를 불러오지 못했습니다.' },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}