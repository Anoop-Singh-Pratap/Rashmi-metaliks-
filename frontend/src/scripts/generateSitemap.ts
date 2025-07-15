import { generateSitemap } from '../lib/sitemapGenerator';

// Generate sitemap when building the site
(async () => {
  console.log('Generating sitemap and robots.txt...');
  await generateSitemap();
})(); 