# SharePoint Integration Guide

## Quick Overview
This guide will walk you through deploying your Tool Inspection Tracker to Vercel and embedding it in SharePoint.

---

## Part 1: Deploy to Vercel

### Step 1: Push Your Code to GitHub
```bash
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your repository: `tool-inspection-tracker-new-1`
4. Click **Import**

### Step 3: Configure Build Settings
Vercel will auto-detect your settings. Verify these are correct:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Step 4: Add Environment Variables
Before clicking Deploy, add these environment variables:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://kxfhmatszcscvbybmvnp.supabase.co`

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4ZmhtYXRzemNzY3ZieWJtdm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNzI0MTMsImV4cCI6MjA4NjY0ODQxM30.G61Ej-rLeCfJqqlalbsutJNi2JUhpgYAzG92TiCgvCA`

### Step 5: Deploy
1. Click **Deploy**
2. Wait 2-3 minutes for deployment to complete
3. Copy your production URL (e.g., `https://tool-inspection-tracker-new-1.vercel.app`)

---

## Part 2: Embed in SharePoint

### Method 1: Using Embed Web Part (Recommended)

1. **Edit Your SharePoint Page**
   - Navigate to your SharePoint site
   - Go to the page where you want to embed the app
   - Click **Edit** at the top right

2. **Add Embed Web Part**
   - Click **+** to add a new web part
   - Search for "Embed"
   - Select **Embed** web part

3. **Paste Embed Code**
   Copy and paste this code (replace `YOUR_VERCEL_URL` with your actual URL):
   ```html
   <iframe
     src="YOUR_VERCEL_URL"
     width="100%"
     height="1200px"
     frameborder="0"
     allow="camera; clipboard-write"
     title="Tool Inspection Tracker">
   </iframe>
   ```

4. **Adjust Settings**
   - Modify the `height` value (1200px) based on your needs
   - Click outside the embed area to save

5. **Publish**
   - Click **Republish** at the top right
   - Your app is now embedded in SharePoint!

---

### Method 2: Using Script Editor Web Part

1. **Edit Your SharePoint Page**
   - Click **Edit** on your page

2. **Add Script Editor**
   - Click **+** to add a new web part
   - Search for "Script Editor"
   - Select **Script Editor** web part

3. **Insert Code**
   Click **Edit Snippet** and paste:
   ```html
   <div style="width: 100%; max-width: 1400px; margin: 0 auto;">
     <iframe
       src="YOUR_VERCEL_URL"
       width="100%"
       height="1200px"
       frameborder="0"
       allow="camera; clipboard-write"
       style="border: 2px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
       title="Tool Inspection Tracker">
     </iframe>
   </div>
   ```

4. **Save and Publish**

---

### Method 3: Full Page Embed

If you want the app to take up the entire page:

1. **Create a New SharePoint Page**
   - Go to **Pages** library
   - Click **+ New** → **Site Page**
   - Choose **Blank** layout
   - Name it "Tool Inspection Tracker"

2. **Add Embed Web Part**
   - Add an Embed web part (as in Method 1)

3. **Use Full-Screen Code**
   ```html
   <style>
     body, .CanvasZone { margin: 0 !important; padding: 0 !important; }
   </style>
   <iframe
     src="YOUR_VERCEL_URL"
     width="100%"
     height="1400px"
     frameborder="0"
     allow="camera; clipboard-write"
     title="Tool Inspection Tracker">
   </iframe>
   ```

4. **Publish the Page**

---

## Important Notes

### Camera Permissions
- The `allow="camera"` attribute enables barcode scanning
- Users will be prompted to grant camera access when scanning barcodes

### HTTPS Requirement
- Vercel automatically provides HTTPS
- SharePoint requires HTTPS for embedded content
- Your Vercel URL will work perfectly

### Responsive Design
- The app is fully responsive and works on mobile, tablet, and desktop
- It will adapt to SharePoint's layout automatically

### Cross-Origin Issues
If you encounter any issues, make sure:
1. Your Vercel deployment is successful
2. Environment variables are correctly set
3. The URL is using HTTPS (Vercel does this automatically)

---

## Testing Your Integration

1. **Test the Vercel App Directly**
   - Open your Vercel URL in a browser
   - Verify all features work (add tool, scan barcode, add inspection)

2. **Test in SharePoint**
   - Open your SharePoint page
   - Verify the app loads correctly
   - Test barcode scanning (camera permission prompt should appear)
   - Test adding tools and inspections

---

## Troubleshooting

### App Doesn't Load in SharePoint
- Check that your Vercel URL is correct
- Verify the URL uses HTTPS
- Check browser console (F12) for errors

### Blank Page in Vercel
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Verify both environment variables are set
- Redeploy if needed

### Barcode Scanner Not Working
- Camera permissions must be granted
- HTTPS is required for camera access
- Make sure `allow="camera"` is in the iframe code

### Database Connection Issues
- Verify Supabase is accessible
- Check that environment variables are correct in Vercel

---

## Example Vercel URLs
After deployment, your URLs will look like:
- Production: `https://tool-inspection-tracker-new-1.vercel.app`
- Preview: `https://tool-inspection-tracker-new-1-git-main-username.vercel.app`

Use the **Production** URL for SharePoint embedding.

---

## Need Help?
If you encounter issues:
1. Check the Vercel deployment logs
2. Check the browser console (F12) for errors
3. Verify all environment variables are set correctly
4. Make sure you're using the production URL, not preview
