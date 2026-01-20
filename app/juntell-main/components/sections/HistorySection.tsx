'use client'

import { motion } from 'framer-motion'
import { historyData } from '@/app/constants/history'

export function HistorySection() {
  return (
    <section className="section-padding border-t border-line-400 bg-background-default">
      <div className="container-custom">
        {/* Section Title */}
        <div className="mb-2 md:mb-4">
          <h2 className="text-title-3 font-bold text-label-900">
            업계를 선도하는 성장의 역사
          </h2>
        </div>

        {/* Year Blocks */}
        <div className="flex flex-col gap-2 md:gap-4">
          {[...historyData].reverse().map((item, yearIndex) => {
            // 연도별 타이틀: highlight된 이벤트를 연도 설명으로 사용
            const yearHighlight = item.events.find((event) => event.highlight)
            const restEvents = item.events.filter((event) => event !== yearHighlight)

            return (
              <div key={item.year} className="flex flex-col gap-1">
                {/* Year + Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: yearIndex * 0.05 }}
                >
                  <h3 className="text-body-2 md:text-title-4 font-extrabold text-label-900">
                    <span>{item.year}</span>
                    {yearHighlight && (
                      <>
                        <span className="mx-2">|</span>
                        <span>{yearHighlight.text}</span>
                      </>
                    )}
                  </h3>
                </motion.div>

                {/* Bulleted Events */}
                {restEvents.length > 0 && (
                  <ul className="mt-1 md:mt-2 space-y-1.5 md:space-y-2">
                    {restEvents.map((event, eventIndex) => (
                      <motion.li
                        key={eventIndex}
                        className="flex items-start gap-2 text-[0.95rem] md:text-body-3 leading-relaxed text-label-800"
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.3, delay: 0.1 + eventIndex * 0.05 }}
                      >
                        <span className="mt-[0.35rem] h-xs w-xs rounded-full bg-label-900 shrink-0" />
                        <span className="whitespace-pre-line text-body-2">
                          {event.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}