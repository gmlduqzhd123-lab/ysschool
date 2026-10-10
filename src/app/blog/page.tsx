import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';
import BlogListSection from '@/components/blog/BlogListSection';

export const metadata: Metadata = {
  title: '교육 이야기·블로그 | 엽쌤스쿨',
  description: '교육과 기술이 만나는 지점에서, 더 나은 교실을 위한 고민과 개발 기록을 나눕니다.',
  openGraph: {
    title: '교육 이야기·블로그 | 엽쌤스쿨',
    description: '교육과 기술이 만나는 지점에서, 더 나은 교실을 위한 고민과 개발 기록을 나눕니다.',
    url: 'https://ysschool.vercel.app/blog',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndex() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* 상단 타이틀 섹션 */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 dark:bg-orange-400/10 text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-wider mb-3">
            <span>Education & Dev Blog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            교육 이야기·블로그
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            교육과 기술이 만나는 교실 현장의 생생한 고민, 에듀테크 개발 비하인드, 수업 혁신 기록들을 모아두었습니다.
          </p>
        </div>

        {/* 인터랙티브 블로그 목록 (검색, 카테고리 필터링, 그리드/리스트 뷰) */}
        <BlogListSection posts={blogPosts} />

        {/* 하단 안내 */}
        <div className="mt-16 text-center py-8 border-t border-slate-200/80 dark:border-slate-800">
          <p className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm font-medium">
            💡 교원 연수, 수업 자료 문의나 에듀테크 협업 제안은 언제든 환영합니다.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
