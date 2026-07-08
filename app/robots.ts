import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/success', '/crm', '/admin', '/login'],
    },
    sitemap: 'https://sibylle-bergold.com/sitemap.xml',
  };
}
