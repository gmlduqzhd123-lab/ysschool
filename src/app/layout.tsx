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
  title: "YSSCHOOL | 엽쌤스쿨",
  description: "교육, 개발, 그리고 집필까지. 끝없이 도전하는 에듀테크 크리에이터 엽쌤의 포트폴리오",
};

import BgmPlayer from "@/components/BgmPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <BgmPlayer />
      </body>
    </html>
  );
}
