import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogIndex() {
  const posts = [
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
      </main>
      <Footer />
    </div>
  );
}
