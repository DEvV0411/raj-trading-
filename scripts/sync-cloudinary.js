import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DATA_PATH = path.join(__dirname, '../src/data/galleryData.json');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function syncWithCloudinary() {
  console.log('☁️ Starting Cloudinary Sync...');
  
  if (process.env.CLOUDINARY_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('❌ Error: Please provide your CLOUDINARY_API_KEY in .env.local');
    return;
  }

  try {
    // 1. Fetch all assets from Cloudinary
    console.log('📡 Fetching assets from Cloudinary...');
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: '', // Fetch everything from root
      max_results: 500
    });

    const cloudAssets = result.resources;
    console.log(`✅ Found ${cloudAssets.length} assets on Cloudinary.`);
    console.log('📦 Cloudinary IDs:', cloudAssets.map(a => a.public_id).join(', '));

    // 2. Load existing gallery data
    const galleryData = JSON.parse(fs.readFileSync(GALLERY_DATA_PATH, 'utf8'));
    let updateCount = 0;

    // 3. Match and update
    console.log('\n🔍 Matching images...');
    galleryData.images = galleryData.images.map(img => {
      const idParts = img.id.split('-');
      if (idParts.length < 2) return img;
      
      const originalFilename = idParts.slice(1).join('-'); // e.g. "PHOTO-2026-03-22-18-34-19.jpg"
      const cleanOriginal = originalFilename.split('.')[0]; // e.g. "PHOTO-2026-03-22-18-34-19"
      
      // Normalize function for more aggressive matching
      const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
      const normalizedOriginal = normalize(cleanOriginal);

      const match = cloudAssets.find(asset => {
        const normalizedAsset = normalize(asset.public_id);
        return normalizedAsset === normalizedOriginal || 
               normalizedAsset.startsWith(normalizedOriginal) ||
               normalizedOriginal.startsWith(normalizedAsset);
      });

      if (match) {
        const newUrl = `https://res.cloudinary.com/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${match.public_id}.${match.format}`;
        
        if (img.src !== newUrl) {
          img.src = newUrl;
          updateCount++;
        }
      } else {
        // Log what we missed
        console.log(`⚠️  No match for: ${img.id}`);
      }
      
      return img;
    });

    // 4. Save updated data
    if (updateCount > 0) {
      galleryData.lastUpdated = new Date().toISOString();
      fs.writeFileSync(GALLERY_DATA_PATH, JSON.stringify(galleryData, null, 2));
      console.log(`\n✨ Success! Updated ${updateCount} images with real Cloudinary links.`);
    } else {
      console.log('\n😴 No updates needed. All links are already synced.');
    }

  } catch (error) {
    console.error('❌ Sync failed:', error.message);
  }
}

syncWithCloudinary();
