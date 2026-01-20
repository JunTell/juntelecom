// 채용공고 타입
export interface Job {
  id: string
  title: string
  department: string
  location: string
  employment_type: string // '정규직', '계약직', '인턴' 등
  experience_level: string // '신입 가능', '경력 2년 이상', '경력 3년 이상' 등
  description: string
  responsibilities: string[]
  requirements: string[]
  preferred_qualifications: string[]
  benefits: string[]
  tags: string[] // 기술 스택 및 키워드 태그
  salary_range?: {
    min: number
    max: number
    currency: string
  }
  posted_at: string
  deadline?: string
  status: 'active' | 'closed' | 'draft'
  is_featured: boolean
  view_count: number
  application_count: number
  created_at: string
  updated_at: string
  created_by?: string
}

// 뉴스 타입
export interface News {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail?: string
  category: string
  tags: string[]
  author: string
  published_at: string
  is_published: boolean
  views: number
  created_at: string
  updated_at: string
}

// 페이지네이션 타입
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T
  error?: string
  pagination?: Pagination
}
