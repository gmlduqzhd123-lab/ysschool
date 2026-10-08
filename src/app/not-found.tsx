import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
  robots: { index: false },
};

const shortcuts = [
  { href: '/training', label: '연수 강의안·자료실' },
  { href: '/showcase', label: '100종 배움게임' },
  { href: '/portfolio', label: '프로필 & 발자취' },
  { href: '/blog', label: '교육 이야기·블로그' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-lg text-center">
          <p className="text-7xl font-black text-brand-sky/80 mb-4" aria-hidden="true">404</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            페이지를 찾을 수 없어요
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 아래 메뉴에서 원하는 내용을 찾아보세요.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-brand-navy hover:bg-brand-sky text-white font-bold px-6 py-3 transition-colors"
          >
            홈으로 가기
          </Link>
          <nav aria-label="주요 메뉴" className="mt-8 flex flex-wrap justify-center gap-2">
            {shortcuts.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-brand-sky hover:text-brand-navy dark:hover:text-brand-sky transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
}
