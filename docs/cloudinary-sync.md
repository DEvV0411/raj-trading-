# ☁️ Troubleshooting Cloudinary Image Sync

If your images are not showing up, it's usually because Cloudinary and your code are using different "Public IDs" (filenames). Here is how to fix it:

## 1. Disable "Unique Filenames" (Recommended)
By default, Cloudinary adds random letters to the end of every image (e.g., `Bangle_Stand_gjy4us`). This makes it impossible for the website to find them automatically.

1. Login to your **Cloudinary Dashboard**.
2. Go to **Settings** (gear icon) -> **Upload**.
3. Scroll down to **Upload Presets**.
4. Edit your active preset (usually named `ml_default`).
5. Set **"Unique Filenames"** to **OFF** (False).
6. Set **"Use filename or external name"** to **ON** (True).
7. Save changes.

**Now, if you upload `MyImage.png`, it will stay exactly as `MyImage.png` on Cloudinary.**

---

## 2. Syncing with the Website
Once your Cloudinary settings are fixed, follow these steps to keep the website updated:

### Step A: Prepare Locally
1. Put your images in the `public/images/kewal` folder on your computer.
2. Organize them into folders (e.g., `public/images/kewal/Bangle Stand/`).

### Step B: Sync the Data
1. Open your terminal in the project folder.
2. Run the sync command:
   ```bash
   node scripts/generate-gallery-data.js
   ```
3. This will update the `galleryData.json` file with the correct links.

### Step C: Upload to Cloudinary
1. Upload the same images to your Cloudinary Media Library.
2. Ensure they are uploaded to the **ROOT** folder (or update the `USE_CLOUDINARY_FOLDERS` setting in the script).

---

## 3. Advanced: Changing Cloud Name
If you change your Cloudinary account, open `scripts/generate-gallery-data.js` and update the `CLOUD_NAME` variable at the top:

```javascript
const CLOUD_NAME = 'your_new_name_here';
```

---

## 4. Why is my image still not loading?
Check the **Public ID** in Cloudinary. If your image is named `Image1_abc123` on Cloudinary but just `Image1` in your code, it will not load. They must match exactly!
