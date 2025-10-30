# Quick Start Guide

## Running the Application

### 1. Start Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5174/` (or next available port)

### 2. Access the Application

#### Home Page (/)
- Beautiful landing page with gradient background
- "Go to Dashboard" button for navigation

#### Dashboard (/dashboard)
- Two sample widgets:
  - **Employee Data Table**: 8 employees with 7 columns
  - **Monthly Sales Chart**: Bar chart with 10 months of data

### 3. Using Export Features

#### Export Table Widget
1. Hover over the "Employee Data" widget
2. Click the 3-dot menu icon (appears in top-right corner)
3. Select "Download" → Choose format:
   - **CSV**: Downloads spreadsheet file
   - **PDF**: Downloads formatted PDF with table

#### Export Graph Widget
1. Hover over the "Monthly Sales Performance" widget
2. Click the 3-dot menu icon
3. Select "Download" → Choose format:
   - **PDF**: Downloads chart as PDF
   - **PNG**: Downloads chart as PNG image
   - **JPG**: Downloads chart as JPG image

### 4. Using Share Features

#### Share Table Widget
1. Hover over the "Employee Data" widget
2. Click the 3-dot menu icon
3. Select "Share" → Choose platform:
   - **WhatsApp**: Share PDF via WhatsApp
   - **Email**: Share PDF via Email
   - **Telegram**: Share PDF via Telegram

#### Share Graph Widget
1. Hover over the "Monthly Sales Performance" widget
2. Click the 3-dot menu icon
3. Select "Share" → Choose platform:
   - **WhatsApp**: Share PNG image via WhatsApp
   - **Email**: Share PNG image via Email
   - **Telegram**: Share PNG image via Telegram

## Expected Behavior

### Success Messages
- "File downloaded successfully." - Appears after successful download
- "Widget shared successfully." - Appears after successful share

### Error Handling
- If something goes wrong: "Unable to export data right now. Please try again."
- Loading spinner appears during export/share operations
- Menu items are disabled while processing

### File Naming
Files are automatically named with timestamp:
- Format: `widget-title_YYYY-MM-DD_HH-MM-SS.extension`
- Example: `employee_data_2025-10-29_12-30-45.csv`

## Code Quality

### ESLint
```bash
npm run lint
```
Expected result: **No errors, no warnings** ✅

### Build
```bash
npm run build
```
Creates production-ready build in `/dist` folder

## Browser Compatibility

### Full Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Features
- **Web Share API**: Modern browsers support native sharing
- **Fallback**: Older browsers use download + manual share instructions
- **Canvas Export**: Supported by all modern browsers

## Key Directories

### Source Code
```
src/
├── pages/              # Route pages
├── modules/            # Feature modules
│   └── dashboard/     # Dashboard module
└── common/            # Shared utilities
    ├── constants/     # Constants
    ├── hooks/         # Custom hooks
    └── utils/         # Utility functions
```

### Configuration
- `/src/main.jsx` - App entry point with Router & Ant Design config
- `/src/App.jsx` - Route definitions
- `package.json` - Dependencies and scripts

## Sample Data

### Table Widget
- 8 employees
- Columns: ID, Name, Department, Position, Salary, Experience, Status
- Realistic business data

### Graph Widget
- 10 months of sales data
- Values range from $4,200 to $8,200
- Bar chart visualization

## Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite automatically uses the next available port (e.g., 5174)

### Export Not Working
1. Check browser console for errors
2. Ensure pop-up blocker is disabled
3. Try downloading instead of sharing

### Share Dialog Not Appearing
1. Web Share API requires HTTPS or localhost
2. Check if browser supports Web Share API
3. Use fallback download + manual share

## Development

### Adding New Widgets
1. Create widget component in `/src/modules/dashboard/components/`
2. Use `useTableExport` or `useGraphExport` hook
3. Wrap with `Widget` component
4. Add to Dashboard Grid

### Customizing Export
- Modify utilities in `/src/common/utils/export/`
- Update constants in `/src/common/constants/exportConstants.js`
- Customize PDF styling in `pdfExporter.js`

### Adding Export Formats
1. Create new exporter in `/src/common/utils/export/`
2. Add format to constants
3. Update download menu options
4. Implement export logic in widget hook

## Performance Tips

- Large tables: Consider pagination before export
- High-resolution charts: Adjust scale in `IMAGE_CONFIG`
- Multiple exports: Use loading states to prevent duplicate operations
- File size: Monitor export file sizes for large datasets

## Security Notes

- All exports are client-side (no data sent to server)
- Filenames are sanitized to prevent injection
- No sensitive data logged to console in production
- Share functionality respects user privacy

## Support

For issues or questions:
1. Check browser console for errors
2. Verify ESLint passes: `npm run lint`
3. Review implementation plan: `/ai-docs/plans/clickup-86d0t17zp-plan.md`
4. Check implementation summary: `/IMPLEMENTATION_SUMMARY.md`
