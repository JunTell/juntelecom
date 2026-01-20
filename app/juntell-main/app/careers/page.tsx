'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Head from 'next/head'

interface Job {
  id: string
  title: string
  department: string
  location: string
  employment_type: string
  experience_level: string
  tags: string[]
  posted_at: string
}

const companyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '준텔레콤',
  description:
    '준텔레콤은 혁신적인 통신 솔루션과 홈페이지 제작, 모바일 폼 서비스를 제공하는 기업입니다.',
  url: 'https://juntell.vercel.app/company',
  foundingDate: '2024',
  sameAs: [],
}


export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('전체')
  const [selectedLocation, setSelectedLocation] = useState('전체')
  const [selectedEmploymentType, setSelectedEmploymentType] = useState('전체')

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const fetchJobs = async (pageToLoad: number, isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true)
        setError(null)
      } else {
        setIsFetchingMore(true)
      }

      const params = new URLSearchParams({
        page: String(pageToLoad),
        limit: '10',
      })

      if (searchQuery) {
        params.set('q', searchQuery)
      }
      if (selectedDepartment !== '전체') {
        params.set('department', selectedDepartment)
      }
      if (selectedLocation !== '전체') {
        params.set('location', selectedLocation)
      }
      if (selectedEmploymentType !== '전체') {
        params.set('employmentType', selectedEmploymentType)
      }

      const res = await fetch(`/api/careers?${params.toString()}`)
      if (!res.ok) throw new Error('채용공고를 불러오지 못했습니다.')

      const data = await res.json()

      if (isInitial) {
        setJobs(data)
      } else {
        setJobs((prev) => [...prev, ...data])
      }

      // 더 이상 가져올 데이터가 없으면 hasMore 종료
      if (!data || data.length < 10) {
        setHasMore(false)
      }

      setPage(pageToLoad)
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      if (isInitial) {
        setLoading(false)
      } else {
        setIsFetchingMore(false)
      }
    }
  }

  // 검색어 및 필터가 변경될 때마다 첫 페이지부터 다시 로딩
  useEffect(() => {
    setPage(1)
    setHasMore(true)
    fetchJobs(1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedDepartment, selectedLocation, selectedEmploymentType])

  // 스크롤(Infinite Scroll)을 위한 IntersectionObserver
  useEffect(() => {
    if (!hasMore) return
    if (!observerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !loading && !isFetchingMore) {
          fetchJobs(page + 1, false)
        }
      },
      {
        threshold: 0.5,
      }
    )

    observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
      observer.disconnect()
    }
  }, [hasMore, loading, isFetchingMore, page, searchQuery, selectedDepartment, selectedLocation, selectedEmploymentType])

  // 서버에서 검색/필터가 적용된 결과를 그대로 사용
  const filteredJobs = jobs

  const departments = ['전체', ...Array.from(new Set(jobs.map((job) => job.department)))]
  const locations = ['전체', ...Array.from(new Set(jobs.map((job) => job.location)))]
  const employmentTypes = ['전체', ...Array.from(new Set(jobs.map((job) => job.employment_type)))]

  return (
    <div className="bg-background-default min-h-screen">
      <Head>
        <title>준텔레콤 채용 | 함께 성장할 동료를 찾습니다</title>
        <meta
          name="description"
          content="준텔레콤과 함께 성장할 동료를 모집합니다. 영업, CS, 기획, 개발 등 다양한 포지션의 채용 공고를 확인해보세요."
        />
        <link rel="canonical" href="https://juntell.vercel.app/careers" />
        <meta property="og:title" content="준텔레콤 채용 | 함께 성장할 동료를 찾습니다" />
        <meta
          property="og:description"
          content="준텔레콤과 함께 성장할 동료를 모집합니다. 영업, CS, 기획, 개발 등 다양한 포지션의 채용 공고를 확인해보세요."
        />
        <meta property="og:url" content="https://juntell.vercel.app/careers" />
        <meta property="og:type" content="website" />
      </Head>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(companyJsonLd) }}
      />
      {/* Hero Section */}
      <section className="bg-linear-to-br from-secondary-50 to-white py-8 md:py-14 lg:py-20 px-3 md:px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-title-44 md:text-title-1 lg:text-display-1 font-bold text-label-900 mb-3 md:mb-5 lg:mb-6 leading-tight"
          >
            통신을 넘어 삶을 바꾸는 여정,<br />
            이 도전에 함께할 동료를 찾습니다
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-body-5 md:text-body-3 lg:text-body-2 text-label-700 mb-6 md:mb-10 lg:mb-12"
          >
            준텔레콤에서 당신의 커리어를 성장시키세요
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-[600px] mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="직무, 직군, 주요 업무 등을 검색해보세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 md:px-6 py-3 md:py-4 pr-10 md:pr-12 border-2 border-line-400 rounded-full text-body-5 md:text-body-3 lg:text-body-2 focus:outline-none focus:border-primary transition-colors"
              />
              <svg
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-label-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b border-line-400 bg-white">
        <div className="max-w-[800px] mx-auto px-3 md:px-6 py-4 md:py-6">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {/* 직군 필터 */}
            <div className="relative">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="appearance-none px-3 md:px-6 py-2 md:py-3 pr-8 md:pr-10 border border-line-400 rounded-full text-caption-1 md:text-body-3 bg-white hover:bg-background-alternative transition-colors cursor-pointer focus:outline-none focus:border-primary"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === '전체' ? '모든 직군' : dept}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-label-700 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* 근무지 필터 */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="appearance-none px-3 md:px-6 py-2 md:py-3 pr-8 md:pr-10 border border-line-400 rounded-full text-caption-1 md:text-body-3 bg-white hover:bg-background-alternative transition-colors cursor-pointer focus:outline-none focus:border-primary"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === '전체' ? '근무 지역' : loc}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-label-700 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* 고용형태 필터 */}
            <div className="relative">
              <select
                value={selectedEmploymentType}
                onChange={(e) => setSelectedEmploymentType(e.target.value)}
                className="appearance-none px-3 md:px-6 py-2 md:py-3 pr-8 md:pr-10 border border-line-400 rounded-full text-caption-1 md:text-body-3 bg-white hover:bg-background-alternative transition-colors cursor-pointer focus:outline-none focus:border-primary"
              >
                {employmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === '전체' ? '모든 채용전형' : type}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-label-700 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* 초기화 버튼 */}
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedDepartment('전체')
                setSelectedLocation('전체')
                setSelectedEmploymentType('전체')
              }}
              className="px-3 md:px-6 py-2 md:py-3 text-caption-1 md:text-body-3 text-label-700 hover:text-label-900 transition-colors"
            >
              초기화
            </button>
          </div>
        </div>
      </section>

      {/* Jobs List Section */}
      <section className="py-6 md:py-10 lg:py-12 px-3 md:px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-5 md:mb-8">
            <h2 className="text-body-2 md:text-title-4 lg:text-[24px] font-bold text-label-900">
              {loading
                ? '채용공고를 불러오는 중입니다...'
                : error
                ? '채용공고를 불러오지 못했습니다'
                : `${filteredJobs.length}개의 포지션이 열려있어요`}
            </h2>
          </div>

          {error ? (
            <div className="text-center py-12 md:py-20">
              <p className="text-body-4 md:text-[16px] lg:text-body-1 text-red-500">{error}</p>
            </div>
          ) : loading ? (
            <div className="flex flex-wrap gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <div className="bg-white border border-line-400 rounded-xl md:rounded-2xl p-5 md:p-8 h-full animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-5 w-20 bg-background-alternative rounded-full" />
                      <div className="h-4 w-16 bg-background-alternative rounded-full" />
                    </div>
                    <div className="h-5 w-3/4 bg-background-alternative rounded mb-3" />
                    <div className="h-4 w-full bg-background-alternative rounded mb-2" />
                    <div className="h-4 w-5/6 bg-background-alternative rounded mb-4" />
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 w-16 bg-background-alternative rounded-full" />
                      <div className="h-6 w-20 bg-background-alternative rounded-full" />
                    </div>
                    <div className="flex gap-4">
                      <div className="h-4 w-20 bg-background-alternative rounded" />
                      <div className="h-4 w-24 bg-background-alternative rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12 md:py-20">
              <p className="text-body-4 md:text-[16px] lg:text-body-1 text-label-500">
                조건에 맞는 채용공고가 없습니다.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-4 md:gap-6">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-full min-h-[160px] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                  >
                    <Link
                      href={{
                        pathname: `/careers/${job.id}`,
                        query: { department: job.department }
                      }}
                      className="flex flex-col gap-2 bg-white border border-line-400 rounded-xl md:rounded-2xl px-5 py-5 md:px-8 md:py-8 hover:shadow-strong transition-all duration-200 hover:-translate-y-1 h-full"
                    >
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <span className="px-2 md:px-3 py-0.5 md:py-1 bg-secondary-100 text-primary text-caption-2 md:text-caption-1 font-semibold rounded-full">
                          {job.department}
                        </span>
                      </div>

                      <h3 className="text-body-4 md:text-body-2 font-bold text-label-900 mb-2 md:mb-3">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                        {job.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 md:px-3 py-0.5 md:py-1 bg-background-alternative text-label-700 text-[10px] md:text-caption-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-start gap-2 md:gap-4 text-[10px] md:text-caption-1 text-label-900">
                        <span className="flex items-start gap-1 break-words">
                          <span className="flex-shrink-0">📍</span>
                          <span className="break-words">{job.location}</span>
                        </span>
                        <span className="flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                          <span>💼</span>
                          <span>{job.experience_level}</span>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {hasMore && !error && (
                <div
                  ref={observerRef}
                  className="h-12 flex items-center justify-center text-caption-1 text-label-500"
                >
                  {isFetchingMore ? '채용공고를 더 불러오는 중입니다...' : '아래로 스크롤하면 더 많은 공고를 볼 수 있어요'}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
