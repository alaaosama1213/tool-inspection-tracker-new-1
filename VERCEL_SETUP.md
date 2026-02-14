# Vercel Deployment Setup Guide

## Step 1: Add Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your project: **tool-inspection-tracker-8cxiazogv**
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)
5. Add these two variables:

### Variable 1:
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://kxfhmatszcscvbybmvnp.supabase.co`
- **Environments:** Check ALL three boxes (Production, Preview, Development)
- Click **Save**

### Variable 2:
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4ZmhtYXRzemNzY3ZieWJtdm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNzI0MTMsImV4cCI6MjA4NjY0ODQxM30.G61Ej-rLeCfJqqlalbsutJNi2JUhpgYAzG92TiCgvCA`
- **Environments:** Check ALL three boxes (Production, Preview, Development)
- Click **Save**

## Step 2: Redeploy

After adding the environment variables:

1. Go to **Deployments** tab (top navigation)
2. Find your latest deployment at the top
3. Click the **three dots menu** (•••) on the right side
4. Click **Redeploy**
5. In the popup, make sure "Use existing Build Cache" is checked
6. Click **Redeploy**

## Step 3: Access Your App

Once redeployment is complete (usually takes 1-2 minutes):

1. Find your **Production** deployment (it will have a "Production" badge)
2. Click on it to open
3. The URL should be: `https://tool-inspection-tracker-8cxiazogv.vercel.app/` (without the `-alaaosama-s-projects` part)

## Troubleshooting

### If you still see an error:

1. **Check the deployment logs:**
   - Go to the deployment
   - Click on "Building" or "Function Logs"
   - Look for any error messages

2. **Verify environment variables are set:**
   - Go to Settings → Environment Variables
   - Make sure both variables show up in the list
   - Make sure they're enabled for "Production"

3. **Check the browser console:**
   - Open your deployed app
   - Press F12 to open developer tools
   - Go to the "Console" tab
   - Look for any red error messages
   - Share any errors you see

### Common Issues:

- **404 Error:** Your environment variables are missing or the app hasn't been redeployed after adding them
- **Blank page:** Check browser console for JavaScript errors
- **"Configuration Required" message:** Environment variables are missing - follow Step 1 again
