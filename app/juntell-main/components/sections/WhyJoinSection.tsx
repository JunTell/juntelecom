'use client'

import { motion } from 'framer-motion'

// 데이터 구조는 그대로 유지
const reasons = [
  {
    title: '기준이 되는 성과',
    description:
      '2014년 창원에서 출발해 KT 공식 파트너 전국 10위권, 온·오프라인 통합 기준 전사 1~2위로 성장했습니다. 성과는 숫자가 아니라, 모두가 신뢰로 쌓아올린 결과입니다.',
  },
  {
    title: '신뢰와 열정으로 움직이는 팀',
    description:
      '준텔레콤의 중심에는 \'정직한 열정\'이 있습니다. 현장의 영업, 사무직, 개발, 홍보까지 — 각자의 자리에서 최선을 다하는 에너지가 하나로 모여 성장의 기준이 됩니다.',
  },
  {
    title: '함께 성장하는 문화',
    description:
      '\'고객이 곧 기준, 직원도 고객이다\'라는 가치로 움직입니다. 대기업 수준의 복지와 투명한 보상 속에서 모든 직무가 존중받으며 오래 함께 성장합니다.',
  },
  {
    title: '전문가로 성장할 기회',
    description:
      '통신, 콘텐츠, 기술, 마케팅까지. 모든 분야에서 \'준텔레콤만의 방식\'으로 배우고 성장할 수 있습니다. 아이디어가 실제 사업이 되는 환경, 그게 우리의 경쟁력입니다.',
  },
  {
    title: '소통과 실행으로 나아가는 조직',
    description:
      '의견은 자유롭게, 실행은 빠르게. 부서의 경계를 넘어 협업하며 고객 감동과 인재 육성, 미래를 향한 방향성을 함께 만듭니다.',
  },
]

export function WhyJoinSection() {
  return (
    <section className="bg-label-100 section-padding">
      <div className="container-custom">
        <div className="grid gap-10 lg:gap-24">
          
          {/* Left Side - Title Block (스타일 유지) */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-title-3 tablet:text-title-3 lg:text-title-2 font-normal leading-tight tracking-[-0.05em] mb-4">
              <span className="text-label-900">기회는 어디에나 있지만,</span>
              <br />
              <span className="font-bold">빠른 성장의 기준은 오직</span>
              <br />
              <span className="font-bold">준텔레콤입니다.</span>
            </h2>
            <p className="text-xl tablet:text-2xl lg:text-[30px] font-medium text-label-500 mt-2 tablet:mt-4">
              지금, 준텔레콤에 합류해야 하는 이유
            </p>
          </motion.div>

          {/* Right Side - List */}
          <div className="flex flex-col gap-8 lg:gap-10 mt-6 lg:mt-0">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Reason Title Block: 원형 뱃지 디자인 반영 */}
                <h3 className="flex items-center mb-3">
                  {/* Number 뱃지: 파란색 원형, 흰색 텍스트 */}
                  <span className="w-7 h-8 tablet:w-10 tablet:h-10 rounded-full flex items-center justify-center bg-primary-500 text-white text-base tablet:text-lg font-bold mr-3 tablet:mr-4 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* 타이틀 텍스트: font-size: 40px, font-weight: 600 */}
                  <span className="text-title-4 lg:text-title-3 font-bold text-label-900 leading-none">
                    {reason.title}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-[1rem] tablet:text-body-2 lg:text-body-1 font-medium text-label-700 leading-relaxed tracking-[-0.07em]">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}