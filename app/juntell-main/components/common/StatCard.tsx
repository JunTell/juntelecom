'use client'

import { useEffect, useState, useRef } from 'react'

interface StatCardProps {
  label: string
  value: string
  unit?: string
  icon?: React.ReactNode
  className?: string
}

export function StatCard({ label, value, unit, icon, className = '' }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    // 숫자만 추출 (억 단위 계산용)
    let targetNumber: number

    if (value.includes('억')) {
      const match = value.match(/(\d+)억\s*(\d+,?\d*)/)
      if (match) {
        const eok = parseInt(match[1])
        const rest = parseInt(match[2]?.replace(/,/g, '') || '0')
        targetNumber = eok * 10000 + rest
      } else {
        targetNumber = parseInt(value.replace(/[^0-9]/g, ''))
      }
    } else {
      targetNumber = parseInt(value.replace(/[^0-9]/g, ''))
    }

    const duration = 2000
    const steps = 60
    const increment = targetNumber / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, targetNumber)

      if (value.includes('억')) {
        const eok = Math.floor(current / 10000)
        const rest = Math.floor(current % 10000)
        setDisplayValue(`${eok}억 ${rest.toLocaleString()}`)
      } else {
        setDisplayValue(Math.floor(current).toLocaleString())
      }

      if (step >= steps) {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  // 기본 아이콘
  const defaultIcon = (
    <svg
      className="absolute bottom-4 right-4 w-16 h-16 opacity-[0.08] text-primary-600"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 13h2v7H3v-7zm4-6h2v13H7V7zm4 2h2v11h-2V9zm4-4h2v15h-2V5z" />
    </svg>
  )

  return (
    <div ref={cardRef} className={`bg-background-default min-h-28 lg:h-40 rounded-xl p-4 tablet:p-5 relative overflow-hidden flex flex-col justify-between ${className}`}>
      <p className="text-body-4 lg:text-body-1 text-label-900 font-semibold">{label}</p>

      <div className="font-bold text-primary-600 text-right mt-auto">
        <div className="flex items-baseline gap-1 justify-end">
          <p className="text-title-4 font-extrabold md:text-title-3 leading-none">
            {displayValue}
          </p>
          {unit && (
            <p className="text-body-4 md:text-body-2 font-bold leading-none">
              {unit}
            </p>
          )}
        </div>
      </div>
      {icon || defaultIcon}
    </div>
  )
}
