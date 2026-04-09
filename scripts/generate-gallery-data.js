import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_PATH = path.join(__dirname, '../public/images/kewal');
const OUTPUT_PATH = path.join(__dirname, '../src/data/galleryData.json');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

function generateGalleryData() {
  const categories = [];
  const allImages = [];

  if (!fs.existsSync(GALLERY_PATH)) {
    console.error(`Gallery path not found: ${GALLERY_PATH}`);
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
            .replace(/\(\d+\)/g, '') // Remove (1), (2), etc.
            .replace(/DSC\d+/gi, '') // Remove DSC03971 etc.
            .replace(/Gemini_Generated_Image_.*$/gi, '') // Remove AI generated strings
            .replace(/PHOTO-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}/gi, '') // Remove date strings
            .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
            .trim();

          // If name becomes empty after cleaning, use the category name
          if (!cleanName) {
            cleanName = itemName;
          }

          allImages.push({
            id: `${itemName}-${imgName}`,
            src: `/images/kewal/${itemName}/${imgName}`,
            category: itemName,
            name: cleanName
          });
        }
      });
    } else {
      // Handle images in the root folder
      const ext = path.extname(itemName).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        allImages.push({
          id: `root-${itemName}`,
          src: `/images/kewal/${itemName}`,
          category: 'General',
          name: itemName.split('.')[0]
        });
      }
    }
  });

  const data = {
    categories: ['All', ...categories],
    images: allImages,
    lastUpdated: new Date().toISOString()
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
  console.log(`Gallery data generated successfully at ${OUTPUT_PATH}`);
  console.log(`Found ${categories.length} categories and ${allImages.length} images.`);
}

generateGalleryData();
