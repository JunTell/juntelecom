'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

const navItems = [
  // { href: '/company', label: '회사소개' },
  { href: '/careers', label: '채용공고' },
  { href: '/landing', label: '이벤트' },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-line-400 py-2 tablet:py-4 bg-background-default">
      <div className="max-w-[800px] mx-auto px-3 tablet:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="준텔레콤 로고"
              width={120}
              height={48}
              priority
              fetchPriority="high"
              className="h-10 tablet:h-12 w-auto"
            />
          </Link>
          <div className="hidden tablet:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-body-5 lg:text-body-2 font-medium transition-colors hover:text-label-900 ${
                    isActive ? 'text-label-900' : 'text-label-700'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="tablet:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        <div
          className={`tablet:hidden overflow-hidden transition-all duration-700 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-3 pt-3 border-t border-line-400">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-body-5 font-medium transition-all duration-1000 ${
                      isActive
                        ? 'bg-secondary-100 text-primary'
                        : 'text-label-700 hover:bg-background-alternative'
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                      transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
