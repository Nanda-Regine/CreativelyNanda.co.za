/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://creativelynanda.co.za',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/admin',
    '/admin/*',
    '/checkout',
    '/checkout/*',
    '/api/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/checkout', '/api'],
      },
    ],
  },
};
