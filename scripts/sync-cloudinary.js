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
  console.log('☁️  Starting DEDUPLICATED Mirror Sync...');
  
  try {
    // 1. Fetch resources using SEARCH API for asset_folder metadata
    console.log('📡 Fetching verified metadata from Cloudinary Search...');
    const searchResponse = await cloudinary.search
      .expression('resource_type:image -public_id:Gemini_Generated_Image*') // Filter out AI prototypes at the source
      .max_results(500)
      .execute();

    const cloudAssets = searchResponse.resources;
    console.log(`✅ Found ${cloudAssets.length} total raw assets.`);

    // 2. SMART DEDUPLICATION & FILTERING
    const folderAssets = cloudAssets.filter(a => a.asset_folder && a.asset_folder !== "");
    const rootAssets = cloudAssets.filter(a => !a.asset_folder || a.asset_folder === "");
    
    console.log(`📂 Folder Assets: ${folderAssets.length}`);
    console.log(`📁 Root Assets: ${rootAssets.length}`);

    const finalAssets = [];
    const seenCoreIds = new Set();
    
    // helper to get core product ID without Cloudinary's random suffixes or copy numbers
    const getCoreId = (publicId) => {
        // Strip common copy patterns: _1, _v2, etc., and random 6-character unique suffixes
        // Example: "Bangle_1_abcd12" -> "Bangle"
        return publicId
            .replace(/_[a-zA-Z0-9]{6}$/, '') // Strip random suffix (often 6 chars)
            .replace(/_[0-9]+$/, '')        // Strip copy number (_1)
            .replace(/_v[0-9]+$/, '')        // Strip version (_v1)
    };

    // Priority 1: Keep everything already organized in a folder
    for (const asset of folderAssets) {
        // Filter out non-product files (like .html dumps)
        if (asset.format === 'html' || asset.public_id.includes('.html')) continue;

        const coreId = getCoreId(asset.public_id);
        
        if (seenCoreIds.has(coreId)) {
            console.log(`⏩ Skipping duplicate folder asset: ${asset.public_id} (Core: ${coreId})`);
            continue;
        }

        finalAssets.push(asset);
        seenCoreIds.add(coreId);
    }
    
    // Priority 2: Only keep root assets if they are UNIQUE (not duplicates of folder items)
    for (const asset of rootAssets) {
        // Filter out non-product files
        if (asset.format === 'html' || asset.public_id.includes('.html')) continue;

        const coreId = getCoreId(asset.public_id);
        
        // If we've already seen this product (even in root or folder), ignore
        if (seenCoreIds.has(coreId)) continue;
        
        // Also check for prefix matches in filename for Bangle/Necklace etc.
        const lowerId = asset.public_id.toLowerCase();
        const keywords = ['bangle', 'necklace', 'earing', 'ring', 'kada', 'mirror', 'tray', 'box', 'pack', 'bag', 'pendant', 'pakkad', 'sample'];
        
        if (keywords.some(k => lowerId.includes(k))) {
            finalAssets.push(asset);
            seenCoreIds.add(coreId);
        }
    }

    const updatedImages = [];
    const activeCategories = new Set();
    
    // 3. Final Formatting
    for (const asset of finalAssets) {
      const publicId = asset.public_id;
      const lowerId = publicId.toLowerCase();
      
      let category = asset.asset_folder || "";

      if (!category) {
         // Keyword backup only for unique root files
         if (lowerId.includes('bangle')) category = "Bangle Stand";
         else if (lowerId.includes('necklace') || /n[0-9]_/.test(lowerId) || lowerId.includes('dsc03937')) category = "Necklace Display";
         else if (lowerId.includes('earing')) category = "Earing Stand";
         else if (lowerId.includes('nail') || lowerId.includes('polish')) category = "Nail Polish Stand";
         else if (lowerId.includes('multipurpose') || lowerId.includes('mutlipurpose')) category = "Multipurpose Tray";
         else if (lowerId.includes('kada')) category = "Kada Tray";
         else if (lowerId.includes('ring')) category = "Ring Stand";
         else if (lowerId.includes('mirror')) category = "Jewellery Mirror";
         else if (lowerId.includes('tool') || lowerId.includes('pakkad')) category = "Jewellery Tools";
         else if (lowerId.includes('pack') || lowerId.includes('bag') || lowerId.includes('pouch')) category = "Packing Bags";
         else if (lowerId.includes('pendant')) category = "Pendant Stand";
         else if (lowerId.includes('chain')) category = "Chain Stand";
         else if (lowerId.includes('gift') || lowerId.includes('box')) category = "Gift Box";
         else if (lowerId.includes('sample')) category = "Sample Tray";
         else if (lowerId.includes('hairband')) category = "Hairband Stand";
         else continue;
      }

      // Final Formatting of Category Name (Title Case)
      category = category.replace(/[/_-]/g, ' ')
                         .split(' ')
                         .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                         .join(' ')
                         .trim();

      const format = asset.format || 'jpg';
      const imageUrl = `https://res.cloudinary.com/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}.${format}`;
      
      updatedImages.push({
        id: `${category.replace(/ /g, '-')}-${publicId.split('/').pop()}.${format}`,
        src: imageUrl,
        category: category,
        name: category // Name is strictly the folder/category name
      });
      activeCategories.add(category);
    }

    // 4. Update JSON
    const finalCategories = Array.from(activeCategories).sort();
    const finalData = {
      categories: ["All", ...finalCategories.filter(c => c !== "All")],
      images: updatedImages,
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(GALLERY_DATA_PATH, JSON.stringify(finalData, null, 2));

    console.log('\n✨ DEDUPLICATION COMPLETE!');
    console.log(`📦 Final Unique Products: ${updatedImages.length}`);
    console.log(`📂 Active Collections: ${finalCategories.length}`);

  } catch (error) {
    console.error('❌ Deduplication Sync failed:', error.message);
    console.error(error.stack);
  }
}

syncWithCloudinary();
