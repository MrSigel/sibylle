import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sibylle-bergold.de';
  
  const pages = [
    '',
    '/ueber-mich',
    '/systemaufstellung',
    '/beziehungsmuster',
    '/partnerschaft',
    '/preise',
    '/referenzen',
    '/academy',
    '/familienmuster',
    '/methode',
    '/sinnfrage',
    '/wissen',
    '/faq',
    '/ahnenmuster',
    '/berufliche-aufstellung',
    '/inneres-kind',
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page === '' ? 1 : 0.8,
  }));
}
