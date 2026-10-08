import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ysschool.vercel.app';

  // 정적 페이지 라우트 및 최종 갱신일
  const staticRoutes: Array<{
    route: string;
    lastModified: string;
    priority: number;
    changeFrequency: 'weekly' | 'monthly';
  }> = [
    { route: '', lastModified: '2026-10-06', priority: 1.0, changeFrequency: 'weekly' },
    { route: '/portfolio', lastModified: '2026-10-06', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/showcase', lastModified: '2026-10-06', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/library', lastModified: '2026-10-06', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/playground', lastModified: '2026-10-06', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/training', lastModified: '2026-10-06', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/training/student-growth-2026', lastModified: '2026-10-06', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/blog', lastModified: '2026-10-06', priority: 0.8, changeFrequency: 'weekly' },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date(item.lastModified),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
