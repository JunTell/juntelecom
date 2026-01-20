'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface StatCard {
  id: number
  title: string
  value: string
  variant: 'primary' | 'dark'
  description?: string
}

const stats: StatCard[] = [
  {
    id: 1,
    title: '인지 제품 수',
    value: '22억 8,900만',
    variant: 'primary',
  },
  {
    id: 2,
    title: '2025년 규모수',
    value: '22,890명',
    variant: 'primary',
  },
  {
    id: 3,
    title: '연간 성장 규모 수',
    value: '76,000명 이상',
    variant: 'primary',
  },
  {
    id: 4,
    title: '연간 방문/유입 고객 수',
    value: '110,000만명 이상',
    variant: 'primary',
  },
  {
    id: 5,
    title: '노출광고수',
    value: '40,000광고회',
    variant: 'dark',
    description: '이 모든 성장은 \'정직한 통신, 투명한 상담\'이라는 기준 위에서 만들어졌습니다.',
  },
]

export function StatsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 자동 슬라이드 (Ticker)
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % stats.length)
      }, 3000) // 3초마다 자동 슬라이드
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  // 사용자가 인디케이터 클릭 시 자동 재생 일시 정지
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)

    // 5초 후 자동 재생 재개
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 5000)
  }

  return (
    <div className="pb-6">

      {/* 360px: Ticker 스타일 자동 슬라이드 */}
      <div className="block tablet:hidden">
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.6
            }}
          >
            {stats.map((stat) => (
              <div key={stat.id} className="w-full shrink-0 px-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`
                    rounded-xl p-6
                    ${stat.variant === 'primary'
                      ? 'bg-primary-700 text-white'
                      : 'bg-label-900 text-white'
                    }
                  `}
                >
                  <div className="text-caption-1 mb-3 opacity-90">{stat.title}</div>
                  <div className="text-title-3 font-bold mb-2">{stat.value}</div>
                  {stat.description && (
                    <div className="text-caption-2 mt-4 opacity-80 leading-relaxed">
                      {stat.description}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 인디케이터 */}
        <div className="flex justify-center gap-2 mt-4">
          {stats.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`
                w-2 h-2 rounded-full transition-all
                ${currentIndex === index
                  ? 'bg-primary-700 w-6'
                  : 'bg-label-300'
                }
              `}
              aria-label={`${index + 1}번째 카드로 이동`}
            />
          ))}
        </div>

        {/* 자동 재생 상태 표시 */}
        <div className="text-center text-caption-2 text-label-500 mt-2">
          {isAutoPlaying ? '자동 재생 중' : '일시 정지'}
        </div>
      </div>

      {/* 데스크탑: Flex 레이아웃 */}
      <div className="hidden tablet:flex tablet:flex-wrap gap-4">
        {stats.slice(0, 4).map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-primary-700 text-white rounded-xl p-6 flex-1 min-w-[calc(50%-0.5rem)] lg:min-w-[calc(25%-0.75rem)]"
          >
            <div className="text-body-5 tablet:text-body-3 mb-3 opacity-90">{stat.title}</div>
            <div className="text-[24px] tablet:text-title-3 lg:text-title-1 font-bold">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 데스크탑: 검은색 카드 (전체 너비) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="hidden tablet:block bg-label-900 text-white rounded-xl p-6 tablet:p-8 mt-4"
      >
        <div className="text-body-5 tablet:text-body-3 mb-3 opacity-90">{stats[4].title}</div>
        <div className="text-[24px] tablet:text-title-3 lg:text-title-1 font-bold mb-4">
          {stats[4].value}
        </div>
        <div className="text-caption-1 tablet:text-body-5 opacity-80 leading-relaxed">
          {stats[4].description}
        </div>
      </motion.div>
    </div>
  )
}
