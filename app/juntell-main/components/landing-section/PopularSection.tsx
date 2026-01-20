import Image from "next/image"
import Link from "next/link"

export default async function PopularSection() {
  return (
    <div className="w-full overflow-hidden relative">
      <Image
        src="/images/popular-section.svg"
        alt="인기 상품"
        width={80}
        height={80}
        className="w-full"
        loading="lazy"
      />

      <div className="absolute inset-x-0 bottom-24 tablet:bottom-40 lg:bottom-60 flex justify-center">
        <Link
          href="/event-form"
          className="w-full max-w-[320px] tablet:max-w-[500px] md:max-w-[720px] h-[56px] tablet:h-[64px] md:h-[80px] rounded-full bg-[#2563EB] text-white text-body-3 tablet:text-[16px] md:text-[18px] font-semibold tracking-[-0.04em] shadow-[0_12px_30px_rgba(37,99,235,0.45)] flex items-center justify-center hover:bg-[#1D4ED8] transition-colors cursor-pointer"
        >
          휴대폰 상담하러 가기
        </Link>
      </div>
    </div>
  )
}