import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";
import { LanguageProvider } from "@/components/LanguageContext";
import { BgmProvider } from "@/components/BgmContext";
import SplashScreen from "@/components/SplashScreen";
import SearchModal from "@/components/SearchModal";
import ChatBot from "@/components/ChatBot";
import { AdminProvider } from "@/components/AdminContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ysschool.vercel.app"),
  title: {
    default: "엽쌤스쿨 | 경계를 넘어서는 교육",
    template: "%s | 엽쌤스쿨",
  },
  description:
    "교육, 개발, 그리고 집필까지. 끝없이 도전하는 에듀테크 크리에이터 엽쌤의 모든 것.",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "엽쌤스쿨",
  },
  openGraph: {
    title: "엽쌤스쿨 | 경계를 넘어서는 교육",
    description:
      "교육, 개발, 그리고 집필까지. 끝없이 도전하는 에듀테크 크리에이터 엽쌤의 모든 것.",
    url: "https://ysschool.vercel.app",
    images: [
      {
        url: "/images/profile_hero.jpg",
        width: 1200,
        height: 630,
        alt: "엽쌤스쿨 - 경계를 넘어서는 교육",
      },
    ],
    type: "website",
    locale: "ko_KR",
    siteName: "엽쌤스쿨",
  },
  twitter: {
    card: "summary_large_image",
    title: "엽쌤스쿨 | 경계를 넘어서는 교육",
    description:
      "교육, 개발, 그리고 집필까지. 끝없이 도전하는 에듀테크 크리에이터 엽쌤의 모든 것.",
    images: ["/images/profile_hero.jpg"],
  },
  icons: {
    apple: "/icons/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1E3A8A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth overflow-x-hidden max-w-[100vw] w-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-w-[100vw] w-full`}
      >
        {/* 📲 앱 설치 도우미: 바로 설치 또는 기기별 설치 방법 안내 (InstallAppButton이 사용) */}
        <Script src="/ys-install.js" strategy="afterInteractive" />
        <LanguageProvider>
          <BgmProvider>
            <AdminProvider>
              <SplashScreen />
              <ScrollToTopOnMount />
              <ScrollProgressBar />
              <SearchModal />
              {children}
              <ScrollToTopButton />
              <ChatBot />
            </AdminProvider>
          </BgmProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
