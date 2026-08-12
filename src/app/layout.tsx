import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";
import { LanguageProvider } from "@/components/LanguageContext";
import SplashScreen from "@/components/SplashScreen";
import SearchModal from "@/components/SearchModal";

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
  title: "엽쌤스쿨 | 경계를 넘어서는 교육",
  description:
    "교육, 개발, 그리고 집필까지. 끝없이 도전하는 에듀테크 크리에이터 엽쌤의 모든 것.",
  manifest: "/manifest.json",
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
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth overflow-x-hidden max-w-[100vw] w-full">
      <head>
        <meta name="theme-color" content="#1E3A8A" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-w-[100vw] w-full`}
      >
        <LanguageProvider>
          <SplashScreen />
          <ScrollToTopOnMount />
          <ScrollProgressBar />
          <SearchModal />
          {children}
          <ScrollToTopButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
