'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isEventFormPage = pathname?.startsWith('/event-form')

  return (
    <>
      {!isEventFormPage && <Navigation />}
      <main className="flex-1">
        <div className="max-w-[800px] mx-auto">
          {children}
        </div>
      </main>
      {!isEventFormPage && <Footer />}
    </>
  )
}

