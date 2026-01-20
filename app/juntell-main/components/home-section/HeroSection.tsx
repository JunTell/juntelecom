import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative h-[280px] tablet:h-[400px] lg:h-[520px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background-900">
        <Image
          src="/images/juntell-main.svg"
          alt="Hero Background"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 text-center container-custom">
        <h1 className="text-[32px] leading-[38px] tablet:text-[40px] tablet:leading-[52px] lg:text-[60px] lg:leading-[72px] font-bold text-white mb-4 tablet:mb-6">
          정직의 기준, 통신의 기준,<br />
          <span className="relative inline-block">
            준텔레콤
          </span>
        </h1>
        <p className="text-[16px] leading-[24px] tablet:text-title-4 tablet:leading-[28px] lg:text-[26px] lg:leading-[31px] font-normal text-white/90 mt-6">
          정직한 통신으로 고객을 연결하고,<br className="tablet:hidden" /> 신뢰와 성장으로 사람을 잇는 통신 전문 기업
        </p>
      </div>
    </section>
  )
}
