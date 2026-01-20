'use client'

import { motion } from 'framer-motion'

const coreValues = [
  {
    title: '혁신',
    description: '끊임없는 기술 혁신으로 업계를 선도합니다',
  },
  {
    title: '신뢰',
    description: '고객과의 신뢰를 최우선으로 생각합니다',
  },
  {
    title: '협력',
    description: '함께 성장하는 협력의 가치를 실천합니다',
  },
]

export default function CompanyPage() {
  return (
    <div className="max-w-[800px] mx-auto tablet:px-6 py-8 tablet:py-12 lg:py-16">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-[22px] tablet:text-3xl lg:text-4xl font-bold mb-6 tablet:mb-8"
      >
        회사소개
      </motion.h1>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-10 tablet:mb-14 lg:mb-16"
      >
        <h2 className="text-body-2 tablet:text-xl lg:text-2xl font-semibold mb-3 tablet:mb-4">회사 개요</h2>
        <p className="text-body-5 tablet:text-body-3 lg:text-body-2 text-label-700 leading-relaxed">
          준텔레콤은 혁신적인 통신 솔루션을 제공하는 선도 기업입니다.
          고객의 성공을 위해 최선을 다하며, 끊임없는 기술 혁신을 통해
          더 나은 미래를 만들어가고 있습니다.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-10 tablet:mb-14 lg:mb-16"
      >
        <h2 className="text-body-2 tablet:text-xl lg:text-2xl font-semibold mb-3 tablet:mb-4">비전</h2>
        <p className="text-body-5 tablet:text-body-3 lg:text-body-2 text-label-700 leading-relaxed">
          통신 기술의 혁신을 통해 세상을 연결하고,
          모든 사람이 더 나은 삶을 누릴 수 있도록 기여합니다.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-10 tablet:mb-14 lg:mb-16"
      >
        <h2 className="text-body-2 tablet:text-xl lg:text-2xl font-semibold mb-4 tablet:mb-6">핵심 가치</h2>
        <div className="flex flex-wrap gap-4 tablet:gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="p-4 tablet:p-6 bg-white rounded-lg shadow-md w-full tablet:w-[calc(50%-0.75rem)]"
            >
              <h3 className="text-body-3 tablet:text-lg lg:text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-caption-1 tablet:text-body-3 lg:text-body-2 text-label-700">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="text-body-2 tablet:text-xl lg:text-2xl font-semibold mb-3 tablet:mb-4">연혁</h2>
        <div className="space-y-3 tablet:space-y-4">
          <div className="flex gap-3 tablet:gap-4">
            <div className="w-16 tablet:w-24 shrink-0 font-semibold text-body-5 tablet:text-body-3">2024</div>
            <div className="text-body-5 tablet:text-body-3 lg:text-body-2">회사 설립</div>
          </div>
          {/* 연혁 추가 */}
        </div>
      </motion.section>
    </div>
  )
}
