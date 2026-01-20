'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ApplicationSuccessPage() {
  const params = useParams()
  const id = params?.id as string

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <div className="max-w-[800px] min-h-screen flex items-center justify-center py-8">
        <div className="w-full bg-white rounded-xl shadow-lg p-6 md:p-8 text-center min-w-[320px]">
          {/* 성공 아이콘 */}
          <div className="mb-6 md:mb-8">
            <div className="w-20 h-20 tablet:w-24 tablet:h-24 md:w-28 md:h-28 mx-auto bg-[#D1FAE5] rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 tablet:w-14 tablet:h-14 md:w-16 md:h-16 text-[#059669]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* 메시지 */}
          <h1 className="text-[18px] leading-[26px] md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 break-keep whitespace-normal">
            지원서가 성공적으로 제출되었습니다
          </h1>
          <p className="text-body-4 leading-[20px] md:text-base text-gray-600 mb-6 md:mb-8 break-keep whitespace-normal">
            제출하신 지원서를 검토한 후<br />
            빠른 시일 내에 연락드리겠습니다.
          </p>

          {/* 안내 메시지 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-5 mb-6 md:mb-8 text-left">
            <h3 className="text-body-5 leading-[18px] md:text-sm font-semibold text-blue-900 mb-2 md:mb-3 break-keep">안내사항</h3>
            <ul className="text-caption-1 leading-[18px] md:text-sm text-blue-800 space-y-1.5 md:space-y-2 break-keep">
              <li>• 지원서 검토에는 약 1-2주 정도 소요됩니다.</li>
              <li>• 합격 시 이메일 또는 전화로 연락드립니다.</li>
              <li>• 문의사항은 juntell21@gmail.com으로 연락주세요.</li>
            </ul>
          </div>

          {/* 버튼 */}
          <div className="space-y-3">
            <Link
              href="/careers"
              className="block w-full px-5 py-2.5 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-body-4 leading-[20px] md:text-base break-keep"
            >
              다른 채용공고 보기
            </Link>
            <Link
              href={`/careers/${id}`}
              className="block w-full px-5 py-2.5 md:px-6 md:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-body-4 leading-[20px] md:text-base break-keep"
            >
              채용공고로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
