# Barcode System Information

## Overview
The Tool Inspection Tracker uses real, scannable barcodes that work with any standard barcode scanner. Each tool gets a unique barcode when registered.

---

## Barcode Format

### CODE128
- Industry-standard barcode format
- High data density (can encode numbers, letters, and symbols)
- Widely supported by all modern barcode scanners
- Excellent reliability and error checking

### Barcode Structure
Each barcode follows this pattern:
```
TOOL-XXXXXXXXX-XXXXXXXXX
```
- Prefix: `TOOL-`
- Two random 9-character alphanumeric strings
- Separated by hyphens for readability
- Example: `TOOL-A3F8K2M9P-7Q4B6N1H5`

---

## Using the Barcodes

### 1. Generating Barcodes
When you register a new tool:
1. Fill in the tool details
2. Submit the form
3. A unique barcode is automatically generated
4. The barcode is saved to the database

### 2. Viewing and Printing Barcodes
1. Go to "All Tools" tab
2. Click "View Barcode" on any tool
3. You'll see a scannable barcode image
4. Options:
   - **Print**: Opens print dialog for printing labels
   - **Download**: Downloads barcode as PNG image

### 3. Scanning Barcodes
Two ways to look up tools:
1. **Barcode Scanner**: Use a physical barcode scanner
   - Scan the barcode on the tool
   - Scanner will input the barcode into the search field
   - Press Enter or click "Lookup Tool"

2. **Manual Entry**: Type the barcode
   - Go to "Scan Barcode" tab
   - Type or paste the barcode manually
   - Click "Lookup Tool"

---

## Compatible Barcode Scanners

The CODE128 format works with:

### Handheld Scanners
- USB wired scanners
- Bluetooth wireless scanners
- 2D imaging scanners
- Laser scanners

### Mobile Apps
- Standard camera apps (some phones)
- Barcode scanner apps (iOS/Android)
- Inventory management apps

### Popular Scanner Brands
- Zebra
- Honeywell
- Datalogic
- Symbol
- Socket Mobile
- Any USB keyboard-wedge scanner

---

## Printing Barcode Labels

### Recommended Label Sizes
- **Standard Labels**: 2" x 1" (50mm x 25mm)
- **Large Labels**: 3" x 2" (75mm x 50mm)
- **Small Labels**: 1.5" x 0.5" (38mm x 13mm)

### Label Materials
- **Paper Labels**: For indoor use, temporary marking
- **Polyester Labels**: Waterproof, durable, outdoor use
- **Vinyl Labels**: Weather-resistant, flexible
- **Metal Labels**: Permanent, high-durability applications

### Printing Options

#### Option 1: Desktop Printer
1. Click "Download" to save barcode as PNG
2. Insert PNG into a Word/Excel document
3. Print on label sheets (Avery 5160 or similar)
4. Cut and apply labels

#### Option 2: Label Printer
1. Click "Print" in the barcode dialog
2. Configure label printer in print settings
3. Print directly on label stock
4. Apply to tools

#### Option 3: Professional Printing
1. Download barcode PNG files
2. Send to professional label printing service
3. Receive pre-printed labels
4. Apply to tools

---

## Barcode Label Design

The generated barcode labels include:
- **Tool Name**: Prominently displayed at top
- **Scannable Barcode**: CODE128 format, optimized size
- **Category**: Tool category for quick reference
- **Serial Number**: If provided during registration
- **Instructions**: "Scan this barcode to verify tool"

---

## Technical Specifications

### Barcode Settings
- **Format**: CODE128
- **Width**: 2px per bar
- **Height**: 80px
- **Font Size**: 16px
- **Margin**: 10px all sides
- **Background**: White (#FFFFFF)
- **Bars**: Black (#000000)

### Download Format
- **File Type**: PNG
- **Resolution**: 800x500 pixels
- **DPI**: Suitable for printing at 1-3 inches
- **Color Space**: RGB
- **Transparency**: None (white background)

---

## Best Practices

### Labeling Tools
1. **Clean Surface**: Apply labels to clean, dry surfaces
2. **Flat Areas**: Choose flat areas for best scanning
3. **Visible Location**: Place where easily accessible
4. **Avoid Curves**: Don't wrap around curved surfaces
5. **Protect Labels**: Consider laminating for durability

### Scanning Tips
1. **Good Lighting**: Ensure adequate lighting for scanner
2. **Steady Hand**: Hold scanner steady, 4-8 inches away
3. **Proper Angle**: Hold scanner perpendicular to barcode
4. **Clean Barcodes**: Keep labels clean and free of damage
5. **Test After Applying**: Test scan immediately after applying

### Maintenance
1. **Replace Damaged Labels**: If barcode becomes unreadable
2. **Keep Backups**: Download and save barcode PNGs
3. **Document Placement**: Note where labels are placed on tools
4. **Regular Checks**: Periodically verify labels are intact

---

## Troubleshooting

### Barcode Won't Scan
- **Check Label Condition**: Is it damaged, dirty, or faded?
- **Check Lighting**: Is there enough light?
- **Check Scanner**: Is the scanner working properly?
- **Check Distance**: Try moving scanner closer or farther
- **Manual Entry**: Type the barcode manually as backup

### Barcode Not Displaying
- **Check Browser**: Ensure JavaScript is enabled
- **Check Connection**: Verify database connection
- **Check Console**: Look for errors in browser console (F12)
- **Refresh Page**: Try refreshing the page

### Print Quality Issues
- **Printer Settings**: Use "Best Quality" or "High Resolution"
- **Paper Type**: Select correct paper type in printer settings
- **Ink Levels**: Check that ink/toner is sufficient
- **Scale**: Ensure barcode is not being scaled/distorted
- **Test Print**: Print on plain paper first to verify

### Scanner Not Inputting Text
- **USB Connection**: Check USB cable connection
- **Bluetooth Pairing**: Verify Bluetooth connection
- **Keyboard Wedge**: Most scanners act as keyboards
- **Driver Installation**: Some scanners need drivers
- **Test Scanner**: Try scanning in a text editor first

---

## Upgrading Scanner Hardware

### Entry Level Scanners ($30-60)
- Basic laser or CCD scanners
- USB wired connection
- Suitable for occasional scanning
- Examples: Tera, NADAMOO, TaoTronics

### Professional Scanners ($100-300)
- 2D imaging technology
- Wireless Bluetooth connectivity
- Durable construction
- Examples: Zebra DS2208, Honeywell Voyager

### Industrial Scanners ($300+)
- Rugged, drop-resistant
- Long-range scanning
- IP65+ waterproof rating
- Examples: Zebra DS3608, Honeywell Granit

---

## Integration with SharePoint

When embedded in SharePoint, the barcode system works seamlessly:
- Barcodes display and scan normally
- Print and download functions work
- No special SharePoint configuration needed
- Scanner input works like keyboard input

---

## Future Enhancements

Potential improvements for future versions:
- QR code option in addition to barcodes
- Bulk barcode printing
- Custom barcode prefixes (e.g., POWER-TOOL-, HAND-TOOL-)
- Barcode history tracking
- Multi-tool label sheets
- Integration with mobile scanning apps

---

## Support

For barcode-related issues:
1. Verify barcode displays correctly in browser
2. Test download/print functionality
3. Test scanner with other applications
4. Check scanner compatibility with CODE128
5. Try manual barcode entry as backup

The system is designed to work with any standard barcode scanner without special configuration. If you experience issues, it's typically related to scanner hardware, label quality, or environmental conditions rather than the software.
