import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/success', '/crm', '/login'],
    },
    sitemap: 'https://sibylle-bergold.de/sitemap.xml',
  };
}
