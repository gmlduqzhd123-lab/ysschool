import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ysschool.vercel.app';
  const routes = [
    '',
    '/portfolio',
    '/showcase',
    '/library',
    '/playground',
    '/training',
    '/tools',
    '/blog',
    '/blog/hello-world',
    '/blog/homepage-ux-refactor',
    '/blog/header-glass-fix',
    '/blog/edutech-library-curation',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
