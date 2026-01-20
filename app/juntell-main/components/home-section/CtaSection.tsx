import Image from 'next/image'
import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* 배경 색상 제거. 이미지만으로 밝기를 조절합니다. */}
      <div className="absolute inset-0 bg-black opacity-80">
        <Image
          src="/images/kt-images.svg"
          alt="CTA Background"
          fill
          // 스크린샷과 유사하게 이미지가 더 선명하게 보이도록 opacity를 조정합니다.
          // 필요에 따라 opacity-60, opacity-70 등으로 조절 가능
          className="object-cover opacity-70" 
        />
      </div>
      <div className="relative z-10 container-custom text-center">
        <h2 className="text-title-3 tablet:text-display-3 lg:text-display-2 font-bold text-white mb-8 tablet:mb-10 leading-tight">
          준텔레콤과 함께 성장할<br />
          동료들을 찾습니다!
        </h2>
        <Link
          href="/careers"
          className="inline-block px-6 tablet:px-8 py-2 tablet:py-3 bg-primary-600 text-white rounded-full text-body-1 tablet:text-body-1 font-semibold hover:bg-primary-700 transition-all hover:scale-105 shadow-heavy"
        >
          채용공고 바로가기
        </Link>
      </div>
    </section>
  )
}