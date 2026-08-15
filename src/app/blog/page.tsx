import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogIndex() {
  const posts = [
    {
      slug: 'header-glass-fix',
      title: '어두운 배경 위의 투명 헤더, 글래스모피즘으로 해결하기',
      date: '2026-08-15',
      description: '에듀테크 쇼케이스 페이지에서 헤더 메뉴가 안 보이는 문제를 발견하고, backdrop-blur 한 줄로 해결한 이야기입니다.'
    },
    {
      slug: 'edutech-library-curation',
      title: 'AI 도구 16종 노하우를 큐레이션하며 배운 것들 — 나눔 서재 제작기',
      date: '2026-08-15',
      description: '에듀테크 나눔 서재에 4개였던 노하우를 16개로 확충하며 고민한 도구 선정 기준, 콘텐츠 구조, 프롬프트 예시 전략을 공유합니다.'
    },
    {
      slug: 'homepage-ux-refactor',
      title: '홈페이지 섹션 11개를 5개로 줄인 이유 — 정보 과잉 vs 깔끔함의 줄다리기',
      date: '2026-08-10',
      description: '모든 걸 보여주고 싶은 욕심과 깔끔한 첫 인상 사이에서 고민한 UX 리팩토링 과정을 정리했습니다.'
    },
    {
      slug: 'hello-world',
      title: '에듀테크 크리에이터로서의 첫 발걸음',
      date: '2026-05-11',
      description: '엽쌤스쿨에 새로운 MDX 기반 블로그를 오픈했습니다. 앞으로 이곳에서 교육 철학과 개발 경험을 나눌 예정입니다.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          Teacher&apos;s Journal
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
          교육과 기술이 만나는 지점에서, 더 나은 교실을 위한 고민들을 기록합니다.
        </p>

        <div className="space-y-8">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-sky transition-colors duration-300 hover:shadow-md">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">{post.date}</div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-sky transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {post.description}
                </p>
              </article>
            </Link>
          ))}
        </div>

        {/* Coming soon notice */}
        <div className="mt-12 text-center py-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            ✏️ 새로운 글을 준비하고 있습니다. 곧 더 많은 이야기를 나눌 예정이에요!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
