'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Footer } from '@/components/layout/Footer'
import { FormField } from '@/components/common/FormField'
import { FileUpload } from '@/components/common/FileUpload'
import { LoadingState } from '@/components/common/LoadingState'
import { ErrorState } from '@/components/common/ErrorState'
import { validatePhoneNumber, validateBirthDate, formatPhoneNumber } from '@/lib/utils/formCheck'

interface Job {
  id: string
  title: string
  company: string
  department?: string | null
}

interface FormData {
  name: string
  phone: string
  email: string
  birthDate: string
  referrer: string
  privacyRequired: boolean
  privacyOptional: boolean
}

export default function JobApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const searchParams = useSearchParams()
  const departmentFromQuery = searchParams.get('department')

  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)

  const formSectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const {
    control,
    handleSubmit: handleFormSubmit,
    watch,
    formState: { errors: formErrors },
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      birthDate: '',
      referrer: '',
      privacyRequired: false,
      privacyOptional: false,
    }
  })

  const formData = watch()

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/careers/${id}`)

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || '채용공고를 불러오지 못했습니다.')
        }

        const data: Job = await res.json()
        setJob({
          ...data,
          department: data.department ?? departmentFromQuery ?? null,
        })
      } catch (err: any) {
        console.error('Fetch Error:', err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id, departmentFromQuery])

  const scrollToSection = (sectionId: string) => {
    formSectionRefs.current[sectionId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  // 필수값 입력 여부 확인
  const isFormValid =
    formData.name.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.birthDate.trim() !== '' &&
    formData.privacyRequired === true

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true)

    try {
      // 지원서 정보를 서버로 전송
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: id,
          department: departmentFromQuery ?? job?.department ?? null,
          name: data.name,
          phone: data.phone,
          email: data.email,
          birthDate: data.birthDate,
          referrer: data.referrer,
          privacyOptional: data.privacyOptional,
          resumeUrl: resumeUrl,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        const errorMessage = errorData.details
          ? `${errorData.error}\n\n${errorData.details}`
          : errorData.error || '지원서 제출에 실패했습니다.'
        throw new Error(errorMessage)
      }

      // 성공 페이지로 이동
      router.push(`/careers/${id}/apply/success`)
    } catch (err: any) {
      console.error('Submit Error:', err.message)
      toast.error(`지원서 제출 중 오류가 발생했습니다: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <>
        <LoadingState />
        <Footer />
      </>
    )
  }

  if (error || !job) {
    return (
      <>
        <ErrorState
          message={error || '채용공고를 찾을 수 없습니다.'}
          action={
            <Link href="/careers" className="text-primary hover:text-secondary-600 transition-colors font-medium">
              ← 채용공고 목록으로 돌아가기
            </Link>
          }
        />
        <Footer />
      </>
    )
  }

  const tableOfContents = [
    { id: 'name', label: '이름', required: true },
    { id: 'phone', label: '연락처', required: true },
    { id: 'email', label: '이메일', required: true },
    { id: 'birthDate', label: '생년월일', required: true },
    { id: 'resume', label: '이력서', required: false },
    { id: 'referrer', label: '추천인', required: false },
    { id: 'privacy', label: '개인정보 동의', required: true },
  ]

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[800px] mx-auto px-4 py-12">
          <Link
            href={`/careers/${id}`}
            className="inline-flex items-center text-primary hover:text-secondary-600 transition-colors mb-8 font-medium text-body-3"
          >
            ← 채용공고로 돌아가기
          </Link>

          <div className="flex gap-8 lg:gap-12">
            {/* 좌측: 폼 영역 */}
            <div className="flex-1 max-w-[720px]">
              <div className="mb-8">
                <h1 className="text-title-1 font-bold text-label-900 mb-2">지원서 작성</h1>
                <p className="text-body-2 text-label-700">{job.title}</p>
                {(departmentFromQuery ?? job.department) && (
                  <p className="text-caption-1 text-label-500 mt-1">
                    지원 부서: {departmentFromQuery ?? job.department}
                  </p>
                )}
              </div>

              <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-10">
                {/* 이름 */}
                <div ref={(el: any) => (formSectionRefs.current['name'] = el)} className="scroll-mt-20">
                  <FormField
                    name="name"
                    control={control}
                    label={<>이름 <span className="text-status-error">•</span></>}
                    rules={{
                      required: '이름을 입력해 주세요.'
                    }}
                    render={(field) => (
                      <input
                        {...field}
                        value={field.value as string}
                        type="text"
                        id="name"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-body-3 ${
                          formErrors.name ? 'border-status-error' : 'border-line-400'
                        }`}
                        placeholder="내용을 입력해 주세요."
                      />
                    )}
                    error={formErrors.name?.message}
                  />
                </div>

                {/* 연락처 */}
                <div ref={(el: any) => (formSectionRefs.current['phone'] = el)} className="scroll-mt-20">
                  <FormField
                    name="phone"
                    control={control}
                    label={<>연락처 <span className="text-status-error">•</span></>}
                    rules={{
                      required: '전화번호를 입력해 주세요.',
                      validate: (value) => validatePhoneNumber(value as string) || true
                    }}
                    render={(field) => (
                      <input
                        {...field}
                        value={field.value as string}
                        type="tel"
                        id="phone"
                        onChange={(e) => {
                          const formattedPhone = formatPhoneNumber(e.target.value)
                          field.onChange(formattedPhone)
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-body-3 ${
                          formErrors.phone ? 'border-status-error' : 'border-line-400'
                        }`}
                        placeholder="010-1234-5678"
                        maxLength={13}
                      />
                    )}
                    error={formErrors.phone?.message}
                  />
                </div>

                {/* 이메일 */}
                <div ref={(el: any) => (formSectionRefs.current['email'] = el)} className="scroll-mt-20">
                  <FormField
                    name="email"
                    control={control}
                    label={<>이메일 <span className="text-status-error">•</span></>}
                    rules={{
                      required: '이메일을 입력해 주세요.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: '올바른 이메일 형식이 아닙니다.'
                      }
                    }}
                    render={(field) => (
                      <input
                        {...field}
                        value={field.value as string}
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-body-3 ${
                          formErrors.email ? 'border-status-error' : 'border-line-400'
                        }`}
                        placeholder="example@domain.com"
                      />
                    )}
                    error={formErrors.email?.message}
                  />
                </div>

                {/* 생년월일 */}
                <div ref={(el: any) => (formSectionRefs.current['birthDate'] = el)} className="scroll-mt-20">
                  <FormField
                    name="birthDate"
                    control={control}
                    label={<>생년월일 <span className="text-status-error">•</span></>}
                    rules={{
                      required: '생년월일을 입력해 주세요.',
                      validate: (value) => validateBirthDate(value as string) || true
                    }}
                    render={(field) => (
                      <input
                        {...field}
                        value={field.value as string}
                        type="text"
                        id="birthDate"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-body-3 ${
                          formErrors.birthDate ? 'border-status-error' : 'border-line-400'
                        }`}
                        placeholder="YYYYMMDD 형식으로 입력해주세요. (예: 19900101)"
                        maxLength={8}
                      />
                    )}
                    error={formErrors.birthDate?.message}
                  />
                </div>

                {/* 이력서 업로드 */}
                <div ref={(el: any) => (formSectionRefs.current['resume'] = el)} className="scroll-mt-20">
                  <FileUpload
                    onFileKeyChange={setResumeUrl}
                    label="이력서 또는 포트폴리오"
                    required={false}
                    description="PDF, Word, 이미지 파일만 업로드 가능합니다. (최대 10MB)"
                  />
                </div>

                {/* 추천인 */}
                <div ref={(el: any) => (formSectionRefs.current['referrer'] = el)} className="scroll-mt-20">
                  <label htmlFor="referrer" className="block text-body-2 font-semibold text-label-900 mb-1">
                    추천인
                  </label>
                  <p className="text-caption-1 text-label-600 mb-3">
                    추천제도를 통해 지원하신 경우 추천인의 성함을 입력해주세요
                  </p>
                  <FormField
                    name="referrer"
                    control={control}
                    render={(field) => (
                      <input
                        {...field}
                        value={field.value as string}
                        type="text"
                        id="referrer"
                        className="w-full px-4 py-3 border border-line-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-body-3"
                        placeholder="내용을 입력해 주세요."
                      />
                    )}
                    error={formErrors.referrer?.message}
                  />
                </div>

                {/* 개인정보 수집 및 이용 동의 */}
                <div ref={(el) => { formSectionRefs.current['privacy'] = el; }} className="scroll-mt-20">
                  <label className="block text-body-2 font-semibold text-label-900 mb-4">
                    지원서 제출을 위한 개인정보 수집 및 이용 동의서
                  </label>

                  <div className="space-y-3">
                    <FormField
                      name="privacyRequired"
                      control={control}
                      rules={{
                        required: '개인정보 수집 및 이용 동의(필수)에 동의해 주세요.'
                      }}
                      render={(field) => (
                        <div className={`flex items-center p-4 border rounded-lg ${formErrors.privacyRequired ? 'border-status-error' : 'border-line-400'}`}>
                          <input
                            type="checkbox"
                            id="privacyRequired"
                            name={field.name}
                            ref={field.ref}
                            checked={field.value as boolean}
                            onChange={(e) => field.onChange(e.target.checked)}
                            onBlur={field.onBlur}
                            className="w-5 h-5 text-primary border-line-400 rounded focus:ring-primary"
                          />
                          <label htmlFor="privacyRequired" className="ml-3 flex-1 flex items-center justify-between cursor-pointer">
                            <span className="text-body-3 text-label-900">개인정보 수집 / 이용 동의</span>
                            <span className="text-status-error font-semibold text-caption-1">필수</span>
                          </label>
                          <svg className="w-5 h-5 text-label-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      )}
                      error={formErrors.privacyRequired?.message}
                    />

                    <FormField
                      name="privacyOptional"
                      control={control}
                      render={(field) => (
                        <div className="flex items-center p-4 border border-line-400 rounded-lg">
                          <input
                            type="checkbox"
                            id="privacyOptional"
                            name={field.name}
                            ref={field.ref}
                            checked={field.value as boolean}
                            onChange={(e) => field.onChange(e.target.checked)}
                            onBlur={field.onBlur}
                            className="w-5 h-5 text-primary border-line-400 rounded focus:ring-primary"
                          />
                          <label htmlFor="privacyOptional" className="ml-3 flex-1 flex items-center justify-between cursor-pointer">
                            <span className="text-body-3 text-label-900">개인정보 수집 / 이용 동의</span>
                            <span className="text-label-500 font-semibold text-caption-1">선택</span>
                          </label>
                          <svg className="w-5 h-5 text-label-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      )}
                      error={formErrors.privacyOptional?.message}
                    />
                  </div>
                </div>

                {/* 제출 버튼 */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={submitting || !isFormValid}
                    className={`w-full px-8 py-4 bg-primary text-white rounded-lg font-semibold transition-all text-body-2 ${
                      submitting || !isFormValid
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-secondary-600'
                    }`}
                  >
                    {submitting ? '제출 중...' : '제출하기'}
                  </button>
                </div>
              </form>
            </div>

            {/* 우측: 목차 */}
            <div className="w-80 hidden lg:block shrink-0">
              <div className="sticky top-8">
                <div className="border border-line-400 rounded-xl p-6">
                  <h3 className="text-body-2 font-semibold text-label-900 mb-4">
                    전체 {tableOfContents.length}개 항목
                  </h3>
                  <ul className="space-y-3">
                    {tableOfContents.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className="text-left text-body-3 text-label-700 hover:text-primary transition-colors flex items-center"
                        >
                          {item.label}
                          {item.required && <span className="ml-1 text-status-error">•</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
