import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/home-section/HeroSection'
import { CompanyIntroSection } from '@/components/home-section/CompanyIntroSection'
import { StartSection } from '@/components/home-section/StartSection'
import { CtaSection } from '@/components/home-section/CtaSection'

// 아래쪽 섹션들은 동적 임포트로 lazy loading
const HistorySection = dynamic(
  () => import('@/components/sections/HistorySection').then((mod) => ({ default: mod.HistorySection })),
  { loading: () => <div className="min-h-[200px]" /> }
)
const WhyJoinSection = dynamic(
  () => import('@/components/sections/WhyJoinSection').then((mod) => ({ default: mod.WhyJoinSection })),
  { loading: () => <div className="min-h-[200px]" /> }
)
const SocialSection = dynamic(
  () => import('@/components/home-section/SocialSection').then((mod) => ({ default: mod.SocialSection })),
  { loading: () => <div className="min-h-[200px]" /> }
)

export const metadata: Metadata = {
  title: '준텔레콤 - 홈페이지 제작/모바일 폼 전문',
  description:
    '홈페이지 제작, 반응형 웹, 모바일 폼 제작까지 한번에 처리하는 준텔레콤. 합리적인 비용으로 빠르게 제작해드립니다.',
  alternates: {
    canonical: 'https://juntell.vercel.app/',
  },
  openGraph: {
    title: '준텔레콤 - 홈페이지 제작/모바일 폼 전문',
    description:
      '홈페이지 제작, 반응형 웹, 모바일 폼 제작까지 한번에 처리하는 준텔레콤. 합리적인 비용으로 빠르게 제작해드립니다.',
    url: 'https://juntell.vercel.app/',
    type: 'website',
  },
}

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '준텔레콤 메인 페이지',
  description:
    '홈페이지 제작, 반응형 웹, 모바일 폼 제작 서비스를 제공하는 준텔레콤 메인 페이지입니다.',
  url: 'https://juntell.vercel.app/',
}

export const revalidate = 300

export default async function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      {/* Hero Section */}
      <HeroSection />

      {/* Company Intro Section */}
      <CompanyIntroSection />

      {/* Start Section */}
      <StartSection />

      {/* CTA Section */}
      <CtaSection />

      {/* History Section */}
      <HistorySection />

      {/* Why Join Section */}
      <WhyJoinSection />

      {/* Social Section */}
      <SocialSection />
    </div>
  )
}
