import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
};

import BgmPlayer from "@/components/BgmPlayer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth overflow-x-hidden max-w-[100vw] w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-w-[100vw] w-full`}
      >
        <ScrollToTopOnMount />
        <ScrollProgressBar />
        {children}
        <ScrollToTopButton />
        <BgmPlayer />
      </body>
    </html>
  );
}
