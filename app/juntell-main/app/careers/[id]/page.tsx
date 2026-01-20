'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import Head from 'next/head'

interface Job {
  id: string
  title: string
  company: string // company 필드 추가
  location: string
  employment_type: string
  experience_level: string
  salary: string // 급여 정보를 문자열로 받음 (예: "월 250만원 + 인센티브")
  description: string
  responsibilities: string[] // 배열 형태로 지정
  requirements: string[]    // 배열 형태로 지정
  benefits: string[]        // 배열 형태로 지정
  department: string | null // department는 NULL일 수 있으므로 null 허용
  posted_at: string
  deadline: string | null
  tags?: string[]
}

export default function JobDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const searchParams = useSearchParams()
  const departmentFromQuery = searchParams.get('department')

  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJob = useCallback(async () => {
    // id가 유효한지 다시 한번 확인
    if (!id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`/api/careers/${id}`)

      if (!res.ok) {
        // API에서 반환된 에러 메시지를 사용
        const errorData = await res.json()
        throw new Error(errorData.error || '채용공고를 불러오지 못했습니다.')
      }

      const data: Job = await res.json()
      // 처음에는 Supabase에서 온 값을 그대로 사용
      setJob({
        ...data,
        department: data.department || null,
      })
    } catch (err: any) {
      console.error('Fetch Error:', err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchJob()
  }, [fetchJob])

  // URL에 department 쿼리 값이 있고, DB에는 아직 없을 때 동기화
  useEffect(() => {
    const syncDepartment = async () => {
      if (!id || !departmentFromQuery) return
      if (!job) return

      // 이미 job에 department가 있으면 굳이 업데이트하지 않음
      if (job.department) return

      // 클라이언트 상태에 먼저 반영
      setJob(prev =>
        prev
          ? {
              ...prev,
              department: departmentFromQuery,
            }
          : prev
      )

      // Supabase 업데이트를 위해 API에 PATCH 요청 (서버 라우트에서 처리 필요)
      try {
        await fetch(`/api/careers/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ department: departmentFromQuery }),
        })
      } catch (e) {
        console.error('Failed to update department in Supabase', e)
      }
    }

    syncDepartment()
  }, [id, departmentFromQuery, job])

  const metaTitle = job
    ? `${job.title} | 채용 상세 | 준텔레콤`
    : '채용 상세 | 준텔레콤'

  const baseDescription =
    job?.description && job.description.length > 0
      ? job.description.replace(/\s+/g, ' ').slice(0, 120)
      : '준텔레콤 채용 공고 상세 페이지입니다. 근무 조건, 업무 내용, 자격 요건 등을 확인해보세요.'

  const metaDescription = job
    ? `${job.company ? job.company + ' ' : ''}${job.title} 채용공고입니다. ${baseDescription}`
    : baseDescription

  // --- 렌더링 로직 시작 ---

  const renderListSection = (
    title: string,
    items: string[] | undefined | null,
    keyPrefix: string
  ) => {
    // 항목이 없거나 배열이 비어있으면 렌더링하지 않음
    if (!items || items.length === 0) return null

    return (
      <div className="border-t pt-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <ul className="list-disc list-inside space-y-2">
          {items.map((item, index) => (
            <li key={`${keyPrefix}-${index}`} className="text-label-700">
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  return (
    <div className="container-custom py-8">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link
          rel="canonical"
          href={`https://juntell.vercel.app/careers/${id}`}
        />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta
          property="og:url"
          content={`https://juntell.vercel.app/careers/${id}`}
        />
        <meta property="og:type" content="article" />
        {job?.tags && job.tags.length > 0 && (
          <meta
            name="keywords"
            content={job.tags.join(', ')}
          />
        )}
      </Head>
      <Link
        href="/careers"
        className="inline-flex items-center text-primary hover:text-primary-800 transition-colors mb-6 font-medium"
      >
        ← 채용공고 목록으로
      </Link>

      {loading ? (
        // 로딩 스켈레톤 상태
        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="bg-linear-to-r from-primary-50 to-secondary-50 p-8 border-b border-line-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="h-4 w-32 bg-background-alternative rounded mb-2" />
                <div className="h-8 w-64 bg-background-alternative rounded" />
              </div>
              <div className="h-10 w-28 bg-background-alternative rounded" />
            </div>
          </div>

          <div className="p-8 border-b border-line-400">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex">
                  <div className="h-4 w-20 bg-background-alternative rounded mr-4" />
                  <div className="h-4 w-32 bg-background-alternative rounded" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <div className="h-6 w-40 bg-background-alternative rounded mb-3" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-background-alternative rounded" />
                <div className="h-4 w-5/6 bg-background-alternative rounded" />
                <div className="h-4 w-4/6 bg-background-alternative rounded" />
              </div>
            </div>
            <div>
              <div className="h-6 w-32 bg-background-alternative rounded mb-3" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-background-alternative rounded" />
                <div className="h-4 w-5/6 bg-background-alternative rounded" />
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        // 에러 상태
        <div className="bg-component-assistive p-6 rounded-lg shadow-lg">
          <p className="text-status-error font-medium mb-4">오류 발생: {error}</p>
          <p className="text-label-700 text-sm mb-4">
            네트워크 상태가 좋지 않거나 서버 응답이 지연되고 있을 수 있어요. 다시 시도해주시거나, 문제가 계속되면 관리자에게 문의해주세요.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchJob}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              다시 불러오기
            </button>
            <Link
              href="/careers"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-line-400 text-sm font-medium text-label-800 hover:bg-background-alternative transition-colors"
            >
              ← 채용공고 목록으로
            </Link>
          </div>
        </div>
      ) : !job ? (
        // 데이터 없음 상태 (Not Found)
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8 text-center">
          <p className="text-label-700 text-lg mb-4">채용공고를 찾을 수 없습니다.</p>
          <Link
            href="/careers"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            ← 채용공고 목록으로 돌아가기
          </Link>
        </div>
      ) : (
        // 정상 데이터 렌더링
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 헤더 섹션 */}
          <div className="bg-linear-to-r from-primary-50 to-secondary-50 p-8 border-b border-line-400">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-label-600 text-sm mb-2">{job.company}</p>
                <h1 className="text-3xl font-bold text-label-900 mb-4">{job.title}</h1>
              </div>
            </div>
          </div>

          {/* 기본 정보 테이블 */}
          <div className="p-8 border-b border-line-400">
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 text-sm">
              <div className="flex">
                <span className="font-semibold text-label-800 w-24">경력</span>
                <span className="text-primary font-medium">{job.experience_level}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-label-800 w-24">근무일시</span>
                <span className="text-label-700">주 5일, 유연근무제</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-label-800 w-24">학력</span>
                <span className="text-primary font-medium">학력무관</span>
              </div>
              <div className="flex flex-wrap items-start">
                <span className="font-semibold text-label-800 w-24 flex-shrink-0">근무지역</span>
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(job.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline flex items-center gap-1 break-words flex-1 min-w-0"
                >
                  <span className="break-words">{job.location}</span>
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="flex">
                <span className="font-semibold text-label-800 w-24">근무형태</span>
                <span className="text-primary font-medium">{job.employment_type}</span>
              </div>
              {job.department && (
                <div className="flex">
                  <span className="font-semibold text-label-800 w-24">부서</span>
                  <span className="text-label-700">{job.department}</span>
                </div>
              )}
            </div>
          </div>

          {/* 본문 컨텐츠 */}
          <div className="p-8">
            {/* 회사소개 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-label-900 mb-4 flex items-center">
                <span className="mr-2">📋</span>회사소개
              </h2>
              <div className="pl-8">
                <p className="text-label-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
              </div>
            </div>

            {/* 주요업무 */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-label-900 mb-4 flex items-center">
                  <span className="mr-2">📋</span>주요업무
                </h2>
                <div className="pl-8">
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={`resp-${index}`} className="text-label-700 flex">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 자격요건 */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-label-900 mb-4 flex items-center">
                  <span className="mr-2">📋</span>자격요건
                </h2>
                <div className="pl-8">
                  <ul className="space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={`req-${index}`} className="text-label-700 flex">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 혜택 및 복지 */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-label-900 mb-4 flex items-center">
                  <span className="mr-2">🏠</span>복지 및 혜택
                </h2>
                <div className="pl-8">
                  <ul className="space-y-2">
                    {job.benefits.map((item, index) => (
                      <li key={`bene-${index}`} className="text-label-700 flex">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 채용절차 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-label-900 mb-4 flex items-center">
                <span className="mr-2">🚀</span>채용절차
              </h2>
              <div className="pl-8">
                <div className="mb-4">
                  <p className="text-label-700 mb-2">
                    <span className="font-semibold">• 접수기간: </span>
                    {job.deadline
                      ? `${new Date(job.posted_at).toLocaleDateString('ko-KR')} ~ ${new Date(job.deadline).toLocaleDateString('ko-KR')}`
                      : `${new Date(job.posted_at).toLocaleDateString('ko-KR')} ~ 상시`}
                  </p>
                  <p className="text-label-700 mb-2">
                    <span className="font-semibold">• 제출서류: </span>
                    온라인 이력서
                  </p>
                  <p className="text-label-700 mb-2">
                    <span className="font-semibold">• 접수방법: </span>
                    입사지원
                  </p>
                  <p className="text-label-700">
                    <span className="font-semibold">• 전형절차: </span>
                    서류전형 → 1차면접 → 최종합격
                  </p>
                </div>
              </div>
            </div>

            {/* 유의사항 */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <h2 className="text-xl font-bold text-label-900 mb-3 flex items-center">
                <span className="mr-2">🔔</span>유의사항
              </h2>
              <p className="text-label-700 text-sm">
                입사지원 서류에 허위사실이 발견될 경우, 채용확정 이후라도 채용이 취소될 수 있습니다.
              </p>
            </div>
          </div>

          {/* 하단 지원 버튼 */}
          <div className="p-8 border-t bg-gray-50">
            <Link
              href={`/careers/${job.id}/apply`}
              className="block w-full py-4 bg-primary-700 text-white rounded-lg text-lg font-bold hover:bg-primary-800 transition-colors shadow-md text-center"
            >
              채용 지원하기
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}