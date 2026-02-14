# Quick Start - Deploy to SharePoint

## Step-by-Step Deployment

### 1. Deploy to Vercel (5 minutes)

**Option A: Using Vercel Website (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub, GitLab, or Bitbucket
3. Click "Add New" → "Project"
4. Import your repository or drag & drop the project folder
5. Vercel auto-detects Vite settings
6. Add Environment Variables:
   - Click "Environment Variables"
   - Add `VITE_SUPABASE_URL` = (your Supabase URL from .env)
   - Add `VITE_SUPABASE_ANON_KEY` = (your Supabase key from .env)
7. Click "Deploy"
8. Wait 2-3 minutes
9. Copy your deployment URL (e.g., `https://your-app.vercel.app`)

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

### 2. Embed in SharePoint (2 minutes)

1. **Go to your SharePoint site**

2. **Create or edit a page**
   - Click "New" → "Page" or edit existing page
   - Give it a name like "Tools Inspection"

3. **Add Embed Web Part**
   - Click "+" button to add web part
   - Search for "Embed"
   - Click on "Embed" web part

4. **Paste your app URL**
   - Enter your Vercel URL: `https://your-app.vercel.app`
   - Or use iframe code:
   ```html
   <iframe src="https://your-app.vercel.app" width="100%" height="1200px" frameborder="0" allow="camera"></iframe>
   ```

5. **Adjust settings**
   - Resize the web part height as needed
   - Click "Republish" if editing existing page

6. **Save and publish**

### 3. Test Everything

✅ **Register a new tool** → Should see barcode generated
✅ **Print barcode label** → Should open print dialog
✅ **Scan barcode** → Should find and display tool
✅ **Add inspection** → Should save successfully
✅ **Upload photos** → Should display in tool details

## Alternative: Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# When prompted:
# - Build command: npm run build
# - Publish directory: dist
```

Then add environment variables in Netlify dashboard:
- Site Settings → Environment Variables
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

## Troubleshooting

### "App not loading in SharePoint"
- Check if your SharePoint admin allows iframe embedding
- Try using the Embed web part instead of Page Viewer
- Clear browser cache and try again

### "Database connection error"
- Verify environment variables are set correctly
- Check Supabase project is running
- Ensure URLs don't have trailing slashes

### "Photos not uploading"
- Check Supabase Storage is enabled
- Verify storage bucket "tool-photos" exists and is public
- Check file size limits (default: 50MB)

## Creating Storage Bucket (If Needed)

1. Go to Supabase Dashboard
2. Click "Storage" in left menu
3. Click "New bucket"
4. Name: `tool-photos`
5. Make it Public
6. Click "Create bucket"

## Next Steps

Once deployed and embedded:
- Share the SharePoint page URL with your team
- Print barcode labels for existing tools
- Train staff on inspection workflow
- Monitor usage and feedback

## Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify all environment variables are set
3. Test the app URL directly (outside SharePoint)
4. Check Supabase logs for database errors
