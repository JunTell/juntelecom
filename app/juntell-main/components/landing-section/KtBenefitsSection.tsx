import { BenefitItem } from "@/types/event"
import { BenefitCard } from "./BenefitCard"
import Image from "next/image"

export default async function KtBenefitsSection() {
  const benefits: BenefitItem[] = [
    {
      id: '01',
      title: '선택약정\nor 공통지원금',
      description: '요금할인과 기기값 할인 중 선택해서 할인 받을 수 있어요',
    },
    {
      id: '02',
      title: '에어팟/애플워치 무료또는 할인',
      description: '초이스 요금제로 디바이스를 할인 받을 수 있어요',
    },
    {
      id: '03',
      title: '제휴카드',
      description: '제휴카드 프로모션으로 24개월간 최대 144만원 할인 받을 수 있어요',
    },
    {
      id: '04',
      title: '인터넷 + tv 가입',
      description: '인터넷 + tv를 함께 가입하면 현금 45만원 또는 최신 가전 할인또는 무료증정',
    },
  ]

  return (
    <section>
      {/* 상단 섹션 - 검은 배경 */}
      <div className="bg-background-900 py-10 px-4 tablet:py-12 tablet:px-6 lg:py-16 lg:px-8 desktop:py-20">
        <div className="max-w-[480px] mx-auto">
          <Image
            src="/images/event1-header.svg"
            width={1080}
            height={1600}
            alt="휴대폰 가격 조건 안내"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* 하단 섹션 - 어두운 회색 배경 */}
      <div className="w-full overflow-hidden">
        <Image
          src="/images/kt-benefit.svg"
          alt="kt-benefit"
          width={1080}
          height={400}
          className="w-full"
        />
      </div>
    </section>
  )
}