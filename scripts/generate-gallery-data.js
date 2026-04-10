import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const GALLERY_PATH = path.join(__dirname, '../public/images/kewal');
const OUTPUT_PATH = path.join(__dirname, '../src/data/galleryData.json');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// CLOUDINARY SETTINGS
const USE_CLOUDINARY = true; 
const CLOUD_NAME = 'deh60mmnv';
// If your images are in the root of Cloudinary, set this to false
const USE_CLOUDINARY_FOLDERS = false; 
// ---------------------

function generateGalleryData() {
  const categories = [];
  const allImages = [];

  if (!fs.existsSync(GALLERY_PATH)) {
    console.error(`ERROR: Gallery path not found: ${GALLERY_PATH}`);
    console.log('--- ACTION REQUIRED ---');
    console.log('1. Please create the folder: public/images/kewal');
    console.log('2. Put your product images inside there (organize them in folders like "Necklace Display")');
    console.log('3. Run this script again: node scripts/generate-gallery-data.js');
    return;
  }

  const items = fs.readdirSync(GALLERY_PATH);

  items.forEach((itemName) => {
    const fullPath = path.join(GALLERY_PATH, itemName);
    const isDirectory = fs.statSync(fullPath).isDirectory();

    if (isDirectory) {
      categories.push(itemName);
      const folderImages = fs.readdirSync(fullPath);
      
      folderImages.forEach((imgName) => {
        const ext = path.extname(imgName).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          // Clean up the name for a more professional look
          let cleanName = imgName.split('.')[0]
            .replace(/\(\d+\)/g, '')
            .replace(/DSC\d+/gi, '')
            .replace(/Gemini_Generated_Image_.*$/gi, '')
            .replace(/PHOTO-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}/gi, '')
            .replace(/[-_]/g, ' ')
            .trim();

          if (!cleanName) {
            cleanName = itemName;
          }

          let finalSrc = `/images/kewal/${itemName}/${imgName}`;
          
          if (USE_CLOUDINARY) {
            // Encode spaces for URL
            const categoryPath = USE_CLOUDINARY_FOLDERS ? `kewal/${encodeURIComponent(itemName)}/` : '';
            
            // In Cloudinary, we can use the full filename (with extension) for the Public ID 
            // especially if "Unique Filenames" is OFF and "Use filename" is ON.
            const publicIdWithExt = encodeURIComponent(imgName); 
            
            // Construct the final URL with auto-format and auto-quality
            finalSrc = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${categoryPath}${publicIdWithExt}`;
          }

          allImages.push({
            id: `${itemName}-${imgName}`,
            src: finalSrc,
            category: itemName,
            name: cleanName
          });
        }
      });
    }
  });

  const data = {
    categories: ['All', ...categories],
    images: allImages,
    lastUpdated: new Date().toISOString()
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
  console.log(`\n✨ Success! Gallery data generated at ${OUTPUT_PATH}`);
  console.log(`📊 Found ${categories.length} categories and ${allImages.length} images.`);
  if (USE_CLOUDINARY) {
    console.log(`☁️  Cloudinary Mode: ON (Cloud: ${CLOUD_NAME})`);
  }
}

generateGalleryData();
