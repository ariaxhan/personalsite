import { readdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ASSETS_DIR = './app/assets';
const MAX_WIDTH = 1200; // Maximum width for any image
const QUALITY = 80; // Quality setting for compression

async function optimizeImages() {
  try {
    const files = await readdir(ASSETS_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file) && !file.includes('optimized')
    );

    for (const file of imageFiles) {
      const inputPath = path.join(ASSETS_DIR, file);
      const outputPath = path.join(ASSETS_DIR, `optimized-${file}`);
      
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      if (metadata.width > MAX_WIDTH) {
        image.resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
      }

      if (file.toLowerCase().endsWith('.png')) {
        await image
          .png({ quality: QUALITY, compressionLevel: 9 })
          .toFile(outputPath);
      } else {
        await image
          .jpeg({ quality: QUALITY, mozjpeg: true })
          .toFile(outputPath);
      }

      console.log(`Optimized: ${file}`);
    }
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages(); 