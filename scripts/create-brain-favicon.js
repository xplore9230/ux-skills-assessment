import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Brain icon SVG from Phosphor Icons - duotone weight
// This is the exact SVG used in the app with the blue color (#3B82F6 or similar)
const brainSVG = `
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <path d="M240,124a48,48,0,0,1-32,45.27h0V176a40,40,0,0,1-80,0,40,40,0,0,1-80,0v-6.73h0a48,48,0,0,1,0-90.54V72a40,40,0,0,1,80,0,40,40,0,0,1,80,0v6.73A48,48,0,0,1,240,124Z" fill="#3B82F6" opacity="0.2"/>
  <path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27,8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z" fill="#3B82F6"/>
</svg>
`;

const outputPath = join(__dirname, '../client/public/brain-favicon.webp');
const outputPathPNG = join(__dirname, '../client/public/brain-favicon.png');
const outputPathLarge = join(__dirname, '../client/public/brain-share.webp');

try {
  const svgBuffer = Buffer.from(brainSVG);
  
  // Create favicon (32x32) with dark background
  await sharp(svgBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 5, g: 8, b: 20, alpha: 1 } })
    .webp({ quality: 90 })
    .toFile(outputPath);
  
  // Create PNG version for better compatibility
  await sharp(svgBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 5, g: 8, b: 20, alpha: 1 } })
    .png()
    .toFile(outputPathPNG);
  
  // Create larger version for social sharing (1200x630 is standard for OG images)
  // Center the icon on a dark background
  await sharp(svgBuffer)
    .resize(800, 800, { fit: 'contain', background: { r: 5, g: 8, b: 20, alpha: 1 } })
    .extend({
      top: 0,
      bottom: 0,
      left: 200,
      right: 200,
      background: { r: 5, g: 8, b: 20, alpha: 1 }
    })
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .webp({ quality: 90 })
    .toFile(outputPathLarge);
  
  console.log('Brain icon favicon created successfully!');
  console.log('- Favicon (webp):', outputPath);
  console.log('- Favicon (png):', outputPathPNG);
  console.log('- Share image:', outputPathLarge);
} catch (error) {
  console.error('Error creating brain favicon:', error);
  process.exit(1);
}

