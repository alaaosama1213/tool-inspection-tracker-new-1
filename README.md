# Tools Inspection Platform

A comprehensive barcode-based tool inspection system with photo management, perfect for SharePoint integration.

## Features

- **Tool Registration**: Add tools with photos, categories, and serial numbers
- **Automatic Barcode Generation**: Unique CODE128 barcode for each tool
- **Scannable Barcodes**: Real scannable barcodes compatible with standard barcode scanners
- **Barcode Scanning**: Instant tool lookup via barcode scanner or manual entry
- **Inspection Tracking**: Record inspections with status, photos, and notes
- **Inspection History**: Complete audit trail for each tool
- **Printable Labels**: Generate, print, and download barcode labels
- **Photo Management**: Attach photos to tools and inspections
- **SharePoint Ready**: Optimized for SharePoint embedding

## Quick Start

### 1. Setup Supabase Storage (5 minutes)

Before deploying, set up the photo storage bucket:

📖 **Follow instructions in**: `SUPABASE_STORAGE_SETUP.md`

Quick version:
1. Go to Supabase Dashboard → Storage
2. Create new bucket named `tool-photos`
3. Make it Public
4. Enable upload policies

### 2. Deploy the App (5 minutes)

📖 **See detailed guide in**: `QUICK_START.md`

**Fastest way (Vercel):**
```bash
npm install -g vercel
vercel
```

Add these environment variables when prompted:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 3. Embed in SharePoint (2 minutes)

1. Edit a SharePoint page
2. Add "Embed" web part
3. Paste your deployed URL
4. Adjust height to 1200px
5. Save and publish

📖 **Complete SharePoint integration guide**: `SHAREPOINT_INTEGRATION.md`

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── AddToolForm.tsx         # Tool registration with initial inspection
│   │   ├── AddInspectionForm.tsx   # Add new inspections
│   │   ├── BarcodeDisplay.tsx      # Barcode label generator
│   │   ├── BarcodeScanner.tsx      # Barcode lookup interface
│   │   ├── ToolDetails.tsx         # Tool info & inspection history
│   │   └── ToolsList.tsx           # All tools list view
│   ├── lib/
│   │   └── supabase.ts             # Database client & types
│   └── App.tsx                     # Main application
├── supabase/
│   └── migrations/                 # Database schema
├── dist/                           # Built files (generated)
├── vercel.json                     # Vercel deployment config
├── netlify.toml                    # Netlify deployment config
└── sharepoint-embed-example.html   # SharePoint embedding example
```

## Database Schema

### Tables

**tools**
- Stores tool information, photos, and barcodes
- Each tool gets a unique barcode on creation

**inspections**
- Stores inspection records linked to tools
- Includes status (Approved/Failed/Needs Repair), notes, and photos

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment Options

### Vercel (Recommended)
- Automatic deployments
- Free SSL certificate
- Global CDN
- Zero configuration

### Netlify
- Easy drag-and-drop deployment
- Continuous deployment from Git
- Free tier available

### Azure Static Web Apps
- Enterprise-grade hosting
- Azure Active Directory integration
- Custom domains

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## Usage Workflow

### 1. Register a New Tool
- Navigate to "Register Tool" tab
- Fill in tool details
- Upload tool photo
- Add initial inspection details (inspector name, result, comments)
- Submit to generate barcode

### 2. Print Barcode Label
- Go to "All Tools" tab
- Click "View Barcode" on any tool
- View the scannable CODE128 barcode
- Print or download the barcode label as PNG
- Attach label to physical tool
- Use any standard barcode scanner to scan

### 3. Scan/Verify Tool
- Go to "Scan Barcode" tab
- Enter or scan the barcode
- View complete tool details and inspection history
- Add new inspection if needed

### 4. Add Inspections
- After finding a tool via barcode
- Click "Add Inspection" in tool details
- Fill in inspection information
- Upload inspection photo
- Submit to record inspection

## Inspection Statuses

- **Approved (Passed)**: Tool is in good working condition
- **Failed**: Tool has failed inspection
- **Needs Repair**: Tool requires maintenance before use

## Security & Permissions

### Current Setup (Public Access)
- Anyone can view, add, and edit tools
- Suitable for internal team use
- No authentication required

### For Production (Optional)
To add user authentication:
1. Enable Supabase Auth
2. Update RLS policies for authenticated users only
3. Add login/logout functionality

See Supabase documentation for authentication setup.

## Troubleshooting

### Photos Not Uploading
- Verify storage bucket `tool-photos` exists
- Check bucket is set to Public
- Ensure upload policies are enabled

### App Not Loading in SharePoint
- Check SharePoint allows iframe embedding
- Verify CORS settings in Vercel/Netlify
- Try different web parts (Embed vs Page Viewer)

### Barcode Not Generating
- Check browser console for errors
- Verify database connection
- Ensure tools table has proper permissions
- Barcode uses CODE128 format (industry standard)
- Compatible with all standard barcode scanners

### Database Connection Errors
- Verify environment variables are correct
- Check Supabase project is active
- Test connection at Supabase dashboard

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS/Android)

## Technologies Used

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Barcode**: JsBarcode (CODE128 format)
- **Icons**: Lucide React
- **Hosting**: Vercel/Netlify/Azure

## Documentation Files

- `README.md` (this file) - Project overview
- `QUICK_START.md` - Fast deployment guide
- `DEPLOYMENT_GUIDE.md` - Comprehensive deployment instructions
- `SHAREPOINT_INTEGRATION.md` - Complete Vercel + SharePoint setup guide
- `BARCODE_INFO.md` - Complete barcode system guide and scanner compatibility
- `SUPABASE_STORAGE_SETUP.md` - Storage bucket configuration
- `sharepoint-embed-example.html` - SharePoint embedding template

## Support & Maintenance

### Updating the App
1. Make code changes
2. Test locally with `npm run dev`
3. Build with `npm run build`
4. Deploy with `vercel` or `netlify deploy`

### Backup Recommendations
- Regular Supabase database backups
- Export tool data periodically
- Save barcode labels for reference

## License

This project is provided as-is for internal business use.

## Contact & Support

For issues or questions:
1. Check the documentation files
2. Review Supabase logs for database errors
3. Check deployment platform logs
4. Test app outside SharePoint to isolate issues
