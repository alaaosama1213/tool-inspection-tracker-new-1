# Supabase Storage Setup for Photos

## Creating the Storage Bucket

Your app needs a Supabase Storage bucket to store tool and inspection photos.

### Step 1: Create the Bucket

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Storage** in the left sidebar
4. Click **New bucket** button
5. Enter the following:
   - **Name**: `tool-photos`
   - **Public bucket**: Toggle ON (photos need to be publicly accessible)
   - **File size limit**: 50 MB (or your preference)
   - **Allowed MIME types**: Leave empty for all types, or specify:
     - `image/jpeg`
     - `image/png`
     - `image/jpg`
     - `image/webp`
6. Click **Create bucket**

### Step 2: Set Bucket Policies (Important)

After creating the bucket, set up policies to allow file uploads:

1. Stay in the Storage section
2. Click on the `tool-photos` bucket
3. Click **Policies** tab
4. Click **New policy**

**Policy 1: Allow Public Read Access**
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'tool-photos');
```

**Policy 2: Allow Authenticated Upload**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'tool-photos');
```

**Policy 3: Allow Public Upload (If needed)**
If your app doesn't use authentication:
```sql
CREATE POLICY "Anyone can upload"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'tool-photos');
```

### Step 3: Verify Setup

1. Go back to Storage → tool-photos
2. Try uploading a test image manually
3. Copy the public URL
4. Open the URL in a new browser tab
5. If you see the image, setup is correct!

## Alternative: Using SQL Editor

You can also create the bucket using SQL:

1. Go to **SQL Editor** in Supabase
2. Run this query:

```sql
-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tool-photos',
  'tool-photos',
  true,
  52428800,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'tool-photos');

-- Allow public uploads
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'tool-photos');

-- Allow public updates
CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'tool-photos')
WITH CHECK (bucket_id = 'tool-photos');

-- Allow public deletes
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'tool-photos');
```

## Folder Structure

The app automatically organizes photos:
```
tool-photos/
├── tools/
│   ├── TOOL-1234567890-ABC123.jpg
│   ├── TOOL-1234567891-DEF456.jpg
│   └── ...
└── inspections/
    ├── inspection-1234567890.jpg
    ├── inspection-1234567891.jpg
    └── ...
```

## Troubleshooting

### "Storage bucket not found"
- Verify the bucket name is exactly `tool-photos`
- Check it's created in the correct Supabase project

### "403 Forbidden" when uploading
- Check that the bucket is marked as Public
- Verify policies are set correctly
- Try deleting and recreating the policies

### Photos not displaying
- Verify public access policy is enabled
- Check the photo URL format: `https://[project-ref].supabase.co/storage/v1/object/public/tool-photos/...`
- Test the URL directly in a browser

### Large file upload fails
- Check file size limit in bucket settings
- Default is 50MB, increase if needed
- Consider image compression before upload

## Security Considerations

### For Production Use:

If you want more secure file uploads:

1. **Enable RLS on storage.objects**
2. **Require authentication**
3. **Add file type validation**
4. **Implement file size checks**
5. **Add virus scanning** (for enterprise)

Example secure policy:
```sql
CREATE POLICY "Authenticated users only"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'tool-photos'
  AND (storage.extension(name) = ANY(ARRAY['jpg', 'jpeg', 'png', 'webp']))
  AND (storage.size(name) < 10485760) -- 10MB limit
);
```

## Testing the Setup

After setup, test in your app:

1. Go to "Register Tool" tab
2. Fill in tool details
3. Upload a photo
4. Click "Add Tool"
5. Go to "All Tools" tab
6. Click on the tool
7. Verify the photo displays correctly

If all steps work, your storage is configured correctly!
