import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DATA_PATH = path.join(__dirname, '../src/data/galleryData.json');
const CLOUD_NAME = 'deh60mmnv';

// --- CONFIGURATION ---
// Set this to true if you uploaded images to a 'kewal' folder on Cloudinary
const USE_KEWAL_FOLDER = false; 
// ---------------------

function fixCloudinaryUrls() {
  if (!fs.existsSync(GALLERY_DATA_PATH)) {
    console.error(`Error: ${GALLERY_DATA_PATH} not found.`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(GALLERY_DATA_PATH, 'utf8'));
  let fixedCount = 0;

  data.images = data.images.map(img => {
    // We only want to fix URLs that don't have the random suffixes or are in the old format
    // But since almost all are broken, we'll rebuild them based on the filename (imgName)
    
    // Extract the original filename from the ID (which looks like "Category-Filename.ext")
    const idParts = img.id.split('-');
    if (idParts.length < 2) return img;
    
    const filename = idParts.slice(1).join('-'); // Rejoin in case filename had dashes
    
    const folderPrefix = USE_KEWAL_FOLDER ? 'kewal/' : '';
    const encodedFilename = encodeURIComponent(filename);
    
    const newSrc = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${folderPrefix}${encodedFilename}`;
    
    // Skip if it was already one of the manually fixed ones (containing suffixes)
    if (img.src.includes('_yyxila') || img.src.includes('_bp94q6')) {
        return img;
    }

    if (img.src !== newSrc) {
      img.src = newSrc;
      fixedCount++;
    }
    
    return img;
  });

  data.lastUpdated = new Date().toISOString();

  fs.writeFileSync(GALLERY_DATA_PATH, JSON.stringify(data, null, 2));
  console.log(`\n✅ Success! Updated ${fixedCount} image URLs in galleryData.json.`);
  console.log(`🚀 All URLs now point to: https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${USE_KEWAL_FOLDER ? 'kewal/' : ''}[filename]`);
  console.log(`\n⚠️  REMINDER: You MUST re-upload your images with "Unique Filenames" set to OFF in Cloudinary settings for these links to work.`);
}

fixCloudinaryUrls();
