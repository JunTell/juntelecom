import { StatCard } from '@/components/common/StatCard'
import { companyStats } from '@/app/constants/stats'

export function CompanyIntroSection() {

  return (
    <section className="bg-primary-600">
      <div className="max-w-[800px] mx-auto px-4 py-12 tablet:px-12 tablet:py-16 lg:px-16 lg:py-20">
        <h2 className="text-title-3 tablet:text-display-3 lg:text-display-3 font-bold text-white mb-6">
          준텔레콤
        </h2>
        <p className="text-[1rem] lg:text-body-1 text-white leading-relaxed mb-4">
          준텔레콤은 이름처럼 <span className="font-bold">'준(準)'의 철학을 지킵니다.</span> 기준을 세우고, 그 기준을 지키는 것.<br />
          우리는 어려운 통신을 쉽게 설명하고, 정직한 정보로 신뢰를 쌓습니다.
        </p>
        <p className="text-[1rem] lg:text-body-1 text-white leading-relaxed mb-10">
          고객에게는 올바른 선택의 기준을, 직원에게는 성장의 기준을 제공합니다.
        </p>

        <div className="-mx-4 tablet:-mx-12 lg:-mx-16 mb-8 h-px bg-white/30" />
        <h3 className="text-[1.5rem] lg:text-title-3 font-bold text-white mb-8">
          숫자로 보는 준텔레콤의 성장
        </h3>

        <div className="grid grid-cols-2 tablet:grid-cols-3 gap-4 tablet:gap-6 mb-8">
          {companyStats.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              unit={stat.unit}
              icon={stat.icon}
            />
          ))}
        </div>

        <p className="text-[1rem] tablet:text-body-3 text-white leading-relaxed">
          이 모든 성장은 '정직한 통신, 투명한 상담'이라는<br className="tablet:hidden" /> 기준 위에서 만들어졌습니다.
        </p>
      </div>
    </section>
  )
}
