import Link from 'next/link'

export function SocialSection() {
  return (
    <section className="section-padding bg-background-default">
      <div className="container-custom">
        <p className='text-title-3 sm:text-title-2 lg:text-title-1 font-semiblod text-label-900 leading-tight'>준텔레콤의</p>
        <p className="text-title-3 sm:text-title-2 lg:text-title-1 font-bold text-label-900 mb-10 sm:mb-12 leading-tight">
          더 많은 정보를 확인하세요.
        </p>
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <Link
            href="https://www.youtube.com/@%EC%A4%80%ED%85%94%EB%A0%88%EC%BD%A4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#FF0000] rounded-xl hover:scale-110 transition-all shadow-strong hover:shadow-heavy"
          >
            <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </Link>
          <Link
            href="http://pf.kakao.com/_HfItxj/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#FEE500] rounded-xl hover:scale-110 transition-all shadow-strong hover:shadow-heavy"
          >
            <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-background-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.442 1.483 4.602 3.773 6.033-.147.536-.922 3.295-.945 3.396-.027.12-.008.244.053.35.061.105.166.173.282.18.097.005 2.395-.157 4.32-1.21.79.138 1.61.21 2.442.21 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
            </svg>
          </Link>
          <Link
            href="https://www.instagram.com/kt_juntelecom/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-linear-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-xl hover:scale-110 transition-all shadow-strong hover:shadow-heavy"
          >
            <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}