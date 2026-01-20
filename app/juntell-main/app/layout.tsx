import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import EmotionCacheProvider from "@/lib/emotion-cache";
import { Toaster } from "sonner";
import Script from "next/script";

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://juntell.vercel.app"),
  title: {
    default: "준텔레콤 - 홈페이지 제작/모바일 폼 전문",
    template: "%s | 준텔레콤",
  },
  description:
    "홈페이지 제작, 반응형 웹, 모바일 폼 제작까지 한번에 처리하는 준텔레콤입니다.",
  keywords: [
    "홈페이지 제작",
    "반응형 웹",
    "모바일 폼",
    "Next.js",
    "SEO 최적화",
  ],
  authors: [{ name: "준텔레콤" }],
  openGraph: {
    type: "website",
    url: "https://juntell.vercel.app",
    title: "준텔레콤 - 홈페이지 제작/모바일 폼 전문",
    description:
      "홈페이지 제작, 반응형 웹, 모바일 폼 제작까지 한번에 처리하는 준텔레콤입니다.",
    siteName: "준텔레콤",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "준텔레콤 홈페이지 제작",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "준텔레콤 - 홈페이지 제작/모바일 폼 전문",
    description:
      "홈페이지 제작, 반응형 웹, 모바일 폼 제작까지 한번에 처리하는 준텔레콤입니다.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/images/juntell-main.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "준텔레콤",
              url: "https://juntell.vercel.app",
              logo: "https://juntell.vercel.app/og-image.png",
              sameAs: [],
            }),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "준텔레콤",
              url: "https://juntell.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://juntell.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className="font-sans antialiased flex flex-col min-h-screen overflow-x-hidden"
        style={{ fontFamily: 'var(--font-pretendard), -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
        suppressHydrationWarning
      >
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <EmotionCacheProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <Toaster
            richColors
            position='top-center'
            duration={2000}
            closeButton={true}
            toastOptions={{
              style: {
                zIndex: 9999,
              },
            }}
          />
        </EmotionCacheProvider>
      </body>
    </html>
  );
}
