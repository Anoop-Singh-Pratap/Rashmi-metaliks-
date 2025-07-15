import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.rashmimetaliks.com';

// Function to recursively get all tsx files
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
}

// Generate sitemap.xml
export async function generateSitemap() {
  try {
    // Get all tsx files from pages directory
    const pagesDir = path.join(process.cwd(), 'src', 'pages');
    const pages = getAllFiles(pagesDir);

    // Pages to exclude from sitemap
    const excludePages = [
      '_app.tsx',
      '404.tsx',
      '500.tsx',
      'NotFound.tsx',
      'ApiDebugger.tsx',
      'NewsAdmin.tsx'
    ];

    // Format pages for sitemap
    const sitemapEntries = pages
      .map((page) => {
        const relativePath = page.replace(pagesDir, '');
        
        // Skip excluded pages
        if (excludePages.some(exclude => relativePath.includes(exclude)) || 
            relativePath.includes('/admin') || 
            relativePath.includes('/api')) {
          return null;
        }

        // Get the route from the file path
        const route = relativePath
          .replace(/\\/g, '/') // Convert Windows path separators
          .replace(/^\//, '') // Remove leading slash
          .replace(/\.tsx$/, '')
          .replace(/\/index$/i, ''); // Handle both index.tsx and Index.tsx
        
        // Format route properly
        const formattedRoute = route === '' ? '' : route.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`).toLowerCase();

        // Set priority based on route depth
        let priority = '0.7';
        if (formattedRoute === '') priority = '1.0'; // Home page
        else if (!formattedRoute.includes('/')) priority = '0.8'; // Main sections

        // Last modified - using current date for simplicity
        const lastModified = new Date().toISOString().split('T')[0];

        return `
  <url>
    <loc>${SITE_URL}${formattedRoute === '' ? '' : `/${formattedRoute}`}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
      })
      .filter(Boolean) // Remove null entries
      .join('');

    // Create the sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;

    // Write to public directory
    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'sitemap.xml'),
      sitemap
    );

    console.log('Sitemap generated successfully');
    
    // Create robots.txt if it doesn't exist
    const robotsTxt = `# Robots.txt for Rashmi Metaliks
User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin/
Disallow: /admin/*

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;

    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'robots.txt'),
      robotsTxt
    );
    
    console.log('Robots.txt generated successfully');
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
} 