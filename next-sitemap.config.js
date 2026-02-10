/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://creativelynanda.co.za',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
