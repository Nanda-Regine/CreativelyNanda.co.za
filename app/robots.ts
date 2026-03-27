import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/checkout/', '/orders/'],
      },
    ],
    sitemap: 'https://creativelynanda.co.za/sitemap.xml',
    host: 'https://creativelynanda.co.za',
  };
}
