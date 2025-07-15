import { generateSitemap } from '../lib/sitemapGenerator.js';

// Run the sitemap generation
generateSitemap()
  .then(() => {
    console.log('✅ Sitemap and robots.txt generated successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }); 