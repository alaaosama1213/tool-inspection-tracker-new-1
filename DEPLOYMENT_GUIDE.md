# Deployment Guide - Tools Inspection Platform

## Quick Deployment Options

### Option 1: Vercel (Recommended - Free & Fast)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Your app will be live in minutes at a URL like: `https://your-app.vercel.app`

3. **Environment Variables**
   - Vercel will prompt you to add environment variables
   - Add these from your `.env` file:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

### Option 2: Netlify (Free & Easy)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build & Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```
   - Select the `dist` folder when prompted

3. **Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

### Option 3: Azure Static Web Apps

1. **Using Azure Portal**
   - Create a new Static Web App
   - Connect your GitHub repository (if applicable)
   - Set build folder: `dist`
   - App location: `/`

2. **Environment Variables**
   - Go to Configuration in Azure Portal
   - Add application settings:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

## Embedding in SharePoint

Once your app is deployed, follow these steps:

### Method 1: Using Page Viewer Web Part

1. **Edit a SharePoint Page**
   - Go to your SharePoint site
   - Create a new page or edit an existing one

2. **Add Page Viewer Web Part**
   - Click "+" to add a web part
   - Search for "Embed" or "Page Viewer"
   - Add the web part to your page

3. **Configure the Web Part**
   - Enter your deployed app URL (e.g., `https://your-app.vercel.app`)
   - Adjust the height (recommended: 1000px minimum)
   - Save and publish the page

### Method 2: Using IFrame Web Part

1. **Edit SharePoint Page**
   - Add an "Embed" web part

2. **Add IFrame Code**
   ```html
   <iframe
     src="https://your-app.vercel.app"
     width="100%"
     height="1200px"
     frameborder="0"
     style="border: none;">
   </iframe>
   ```

3. **Save and Publish**

### Method 3: SharePoint Link

- Simply create a hyperlink on your SharePoint page
- Link opens the app in a new tab
- Users get full-screen experience

## Important Notes

### CORS Configuration

Your app is already configured to work when embedded. If you experience issues:

1. **Check Supabase CORS Settings**
   - Go to Supabase Dashboard > Settings > API
   - Ensure your SharePoint domain is allowed

### Security Considerations

1. **Environment Variables**
   - Never commit `.env` file to version control
   - Always use platform's environment variable settings

2. **SharePoint Permissions**
   - Ensure users have access to the SharePoint page
   - The app itself is publicly accessible once deployed

### Mobile Support

- The app is fully responsive
- Works on mobile browsers
- SharePoint mobile app may have limited iframe support

## Testing Before SharePoint Integration

1. **Test Deployed App**
   - Visit your deployed URL directly
   - Verify all features work
   - Test barcode generation and scanning

2. **Test in IFrame Locally**
   - Create a simple HTML file:
   ```html
   <!DOCTYPE html>
   <html>
   <body>
     <iframe src="https://your-app.vercel.app" width="100%" height="1200px"></iframe>
   </body>
   </html>
   ```
   - Open in browser to test iframe behavior

## Troubleshooting

### App Not Loading in SharePoint
- Check browser console for errors
- Verify CORS settings
- Ensure SharePoint allows iframe embedding

### Environment Variables Not Working
- Rebuild after adding environment variables
- Clear browser cache
- Check variable names match exactly

### Performance Issues
- Optimize images before upload
- Consider lazy loading for large tool lists
- Use CDN for static assets

## Updating the App

1. **Make Changes Locally**
2. **Build**
   ```bash
   npm run build
   ```
3. **Redeploy**
   - Vercel: `vercel --prod`
   - Netlify: `netlify deploy --prod`

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **SharePoint Embedding**: https://support.microsoft.com/sharepoint
- **Supabase Docs**: https://supabase.com/docs
