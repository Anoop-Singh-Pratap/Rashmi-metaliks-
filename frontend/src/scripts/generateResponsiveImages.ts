// This is a script you would run during build time or as needed
// Example usage: node generateResponsiveImages.js

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import glob from 'glob';

const sourceDir = path.join(process.cwd(), 'public/lovable-uploads');
const outputDir = sourceDir;

// Widths for responsive images
const widths = [300, 600, 900];

async function processImage(filePath) {
  const filename = path.basename(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));
  const ext = path.extname(filePath).substring(1);

  // Skip videos and non-images
  const imageExts = ['jpg', 'jpeg', 'png', 'webp'];
  if (!imageExts.includes(ext.toLowerCase())) return;

  // Skip if already processed
  if (baseName.includes('-300w') || baseName.includes('-600w') || baseName.includes('-900w')) return;

  console.log(`Processing ${filename}...`);

  try {
    // Create responsive versions
    for (const width of widths) {
      const outputPath = path.join(outputDir, `${baseName}-${width}w.${ext}`);
      
      // Skip if already exists
      if (fs.existsSync(outputPath)) continue;
      
      await sharp(filePath)
        .resize(width)
        .toFile(outputPath);
      
      console.log(`Created ${baseName}-${width}w.${ext}`);
    }
    
    // Create WebP version
    const webpOutputPath = path.join(outputDir, `${baseName}.webp`);
    if (!fs.existsSync(webpOutputPath)) {
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpOutputPath);
      
      console.log(`Created ${baseName}.webp`);
    }
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

// Find all images in the directory
glob(`${sourceDir}/**/*.{jpg,jpeg,png}`, async (err, files) => {
  if (err) {
    console.error('Error finding files:', err);
    return;
  }

  // Process files
  for (const file of files) {
    await processImage(file);
  }

  console.log('All images processed');
}); 