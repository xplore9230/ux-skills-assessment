import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '../client/public/orb.webp');
const outputPath = join(__dirname, '../client/public/orb-favicon.webp');

if (!existsSync(inputPath)) {
  console.error('Input file not found:', inputPath);
  process.exit(1);
}

try {
  // Create a blurred version with multiple blur passes for stronger effect
  await sharp(inputPath)
    .resize(32, 32, { fit: 'contain', background: { r: 5, g: 8, b: 20, alpha: 1 } })
    .blur(8) // Apply blur
    .webp({ quality: 90 })
    .toFile(outputPath);
  
  console.log('Blurred favicon created successfully at:', outputPath);
} catch (error) {
  console.error('Error creating blurred favicon:', error);
  process.exit(1);
}

