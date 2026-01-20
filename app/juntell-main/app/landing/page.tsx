import type { Metadata } from 'next'
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AnyOneSection } from "@/components/landing-section/AnyOneSection";
import { EventReason } from "@/components/landing-section/EventReason";
import { EventReview } from "@/components/landing-section/EventReview";
import KtBenefitsSection from "@/components/landing-section/KtBenefitsSection";
import MarketBenefitsSection from "@/components/landing-section/MarketBenefitsSection";
import PopularSection from "@/components/landing-section/PopularSection";
import { VisitEvent } from "@/components/landing-section/VisitEvent";

export const metadata: Metadata = {
  title: '준텔레콤 이벤트 랜딩 | 한정 혜택 안내',
  description:
    'KT 공홈 혜택, 추가 사은품, 방문 이벤트 등 준텔레콤에서만 제공하는 특가 이벤트 랜딩 페이지입니다.',
  alternates: {
    canonical: 'https://juntell.vercel.app/landing',
  },
  openGraph: {
    title: '준텔레콤 이벤트 랜딩 | 한정 혜택 안내',
    description:
      'KT 공홈 혜택, 추가 사은품, 방문 이벤트 등 준텔레콤에서만 제공하는 특가 이벤트 소개 페이지.',
    url: 'https://juntell.vercel.app/landing',
    type: 'website',
  },
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: '준텔레콤 특별 방문 이벤트',
  description:
    'KT 공홈 혜택 + 추가 사은품 + 방문 이벤트가 포함된 준텔레콤 한정 이벤트 랜딩 페이지입니다.',
  eventStatus: 'https://schema.org/EventScheduled',
  startDate: '2025-01-01T00:00:00+09:00',
  endDate: '2025-11-30T23:59:59+09:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: '준텔레콤',
    address: '대한민국',
  },
  url: 'https://juntell.vercel.app/landing',
}

export default async function Landing() {
  return (
    <div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      {/* KT 공홈 공통 이득 섹션 */}
      <KtBenefitsSection />
      
      {/* 우리만 해주는 이득 섹션 */}
      <MarketBenefitsSection />

      {/* <CountdownTimer endTime="2025-11-30T23:59:59+09:00" /> */}
      {/* 인기 기종 섹션 */}
      <PopularSection />

      {/* 이벤트 이유? */}
      <EventReason />

      {/* 누구나 할인받을수 있는 내용 */}
      <AnyOneSection />

      {/* 방문이벤트 섹션 */}
      <VisitEvent />

      {/* 리뷰섹션 */}
      <EventReview />
    </div>
  )
}
