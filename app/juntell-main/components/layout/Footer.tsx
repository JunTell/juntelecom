import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#2B2B2B] py-8 tablet:py-10 lg:py-12">
      <div className="max-w-[800px] mx-auto px-4 tablet:px-6">

        <h3 className="text-body-1 tablet:text-title-4 lg:text-title-3 font-bold text-white mb-4 tablet:mb-6">
          KT 공식 대리점 (주)준텔레콤
        </h3>

        <div className="space-y-1 text-caption-1 tablet:text-body-4 lg:text-body-3 text-label-300 mb-4 tablet:mb-6 text-white">
          <p>
            사업자등록번호 436-81-00474 | 대표 : 백재준
          </p>
          <p>
            고객센터 : 1522-6562 / 070-5217-9231
          </p>
          <p>
            개인정보보호책임자: 정우승
          </p>
          <p>
            경상남도 창원시 성산구 마디미로 22번길12 4층 KT마켓 본사
          </p>
        </div>

        <div className="flex flex-wrap gap-4 tablet:gap-6 mb-6 tablet:mb-8 text-caption-1 tablet:text-body-4 lg:text-body-3 font-medium">
          <Link href="/privacy" className="text-white hover:text-primary-400">
            개인정보 처리방침
          </Link>
          <Link href="/terms" className="text-white hover:text-primary-400">
            서비스 이용약관
          </Link>
          <Link href="/company" className="text-white hover:text-primary-400">
            회사 소개
          </Link>
        </div>


        <p className="text-caption-2 tablet:text-caption-1 lg:text-body-4 text-label-500">
          &copy; {new Date().getFullYear()} 준텔레콤. All rights reserved.
        </p>
      </div>
    </footer>
  )
}