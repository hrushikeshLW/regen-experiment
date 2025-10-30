# Dashboard Architecture Documentation

## System Overview

This document provides a detailed technical overview of the dashboard implementation with widget export and share functionality.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Application                          │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    React Router                         │ │
│  │                                                          │ │
│  │  /                    /dashboard                        │ │
│  │  Home Page           Dashboard Page                     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App (Routes)
│
├─ Home
│  └─ Button → navigate('/dashboard')
│
└─ Dashboard
   └─ DashboardGrid
      ├─ TableWidget
      │  ├─ Widget (wrapper)
      │  │  ├─ WidgetOptionsMenu
      │  │  │  ├─ DownloadSubMenu
      │  │  │  └─ ShareSubMenu
      │  │  └─ Card (Ant Design)
      │  └─ Table (Ant Design)
      │
      └─ GraphWidget
         ├─ Widget (wrapper)
         │  ├─ WidgetOptionsMenu
         │  │  ├─ DownloadSubMenu
         │  │  └─ ShareSubMenu
         │  └─ Card (Ant Design)
         └─ BarChart (Recharts)
```

## Data Flow Architecture

### Export Flow
```
User Action (Click Export)
        ↓
WidgetOptionsMenu (capture selection)
        ↓
Widget Component (call onDownload handler)
        ↓
TableWidget/GraphWidget (route to appropriate hook)
        ↓
useTableExport / useGraphExport (hook)
        ↓
Export Utility (csvExporter/pdfExporter/imageExporter)
        ↓
File Generation (Papa/jsPDF/html2canvas)
        ↓
file-saver (trigger download)
        ↓
User Feedback (toast notification)
```

### Share Flow
```
User Action (Click Share)
        ↓
WidgetOptionsMenu (capture platform)
        ↓
Widget Component (call onShare handler)
        ↓
TableWidget/GraphWidget (route to appropriate hook)
        ↓
useTableExport / useGraphExport (hook)
        ↓
Generate Export File (PDF/PNG)
        ↓
useShare Hook
        ↓
shareHandler (Web Share API or fallback)
        ↓
Platform Share Dialog or Download
        ↓
User Feedback (toast notification)
```

## Module Structure

### Dashboard Module (`/src/modules/dashboard/`)

#### Components Directory
```
components/
├── Dashboard.jsx           # Main container, orchestrates layout
├── DashboardGrid.jsx       # Grid layout system with responsive cols
├── Widget.jsx              # Base wrapper with hover and export UI
├── WidgetOptionsMenu.jsx   # 3-dot dropdown menu
├── DownloadSubMenu.jsx     # Download format options
├── ShareSubMenu.jsx        # Share platform options
├── TableWidget.jsx         # Table-specific implementation
└── GraphWidget.jsx         # Graph-specific implementation
```

#### Responsibilities
- **Dashboard**: Sample data, widget instantiation, layout
- **DashboardGrid**: Responsive grid system (Row/Col from Ant Design)
- **Widget**: Hover state, menu visibility, loading state, card styling
- **WidgetOptionsMenu**: Dropdown trigger, menu items based on widget type
- **TableWidget**: Table rendering, export hooks, data management
- **GraphWidget**: Chart rendering, ref management for capture

### Common Utilities (`/src/common/`)

#### Constants
```javascript
// exportConstants.js
- WIDGET_TYPES: table, graph
- EXPORT_FORMATS: csv, pdf, png, jpg
- SHARE_PLATFORMS: whatsapp, email, telegram
- MESSAGES: User feedback messages
- PDF_CONFIG: PDF generation settings
- IMAGE_CONFIG: Image capture settings
```

#### Export Utilities
```
utils/export/
├── csvExporter.js          # Papa.unparse → Blob → download
├── pdfExporter.js          # jsPDF + autoTable / html2canvas
├── imageExporter.js        # html2canvas → canvas.toBlob
└── exportHelpers.js        # Filename, validation, formatting
```

#### Share Utilities
```
utils/share/
├── shareHandler.js         # Web Share API + fallbacks
└── shareHelpers.js         # Support detection, URL generation
```

#### Custom Hooks
```
hooks/
├── useWidgetExport.js      # Abstraction layer (delegates)
├── useTableExport.js       # Table-specific export logic
├── useGraphExport.js       # Graph-specific export logic
└── useShare.js             # Share state management
```

## Hook Architecture

### useTableExport Hook
```javascript
Input: (tableData, columns, widgetTitle)

State:
- isExporting: boolean

Methods:
- exportAsCSV()         → csvExporter
- exportAsPDF()         → pdfExporter (table)
- shareTable(platform)  → pdfExporter + useShare

Returns:
- { exportAsCSV, exportAsPDF, shareTable, isExporting }
```

### useGraphExport Hook
```javascript
Input: (graphRef, widgetTitle)

State:
- isExporting: boolean

Methods:
- exportAsPDF()           → pdfExporter (graph)
- exportAsImage(format)   → imageExporter
- shareGraph(platform)    → imageExporter + useShare

Returns:
- { exportAsPDF, exportAsImage, shareGraph, isExporting }
```

### useShare Hook
```javascript
State:
- isSharing: boolean

Methods:
- share(blob, platform, title, filename)

Logic:
- Check Web Share API support
- Create File from Blob
- Call navigator.share() or fallback
- Handle errors and cancellations

Returns:
- { share, isSharing }
```

## State Management

### Local Component State
```
Widget Component:
- isHovered: boolean (menu visibility)

Hook State:
- isExporting: boolean (loading indicator)
- isSharing: boolean (share in progress)
```

### Props Flow
```
Dashboard
  ├─ data (table/graph data)
  ├─ columns (table structure)
  └─ title (widget title)
        ↓
TableWidget / GraphWidget
  ├─ processes data with hook
  └─ passes handlers to Widget
        ↓
Widget
  ├─ receives onDownload handler
  ├─ receives onShare handler
  └─ passes to WidgetOptionsMenu
        ↓
WidgetOptionsMenu
  ├─ calls onDownload(format)
  └─ calls onShare(platform)
```

## Export Implementation Details

### CSV Export (Tables)
```javascript
Input: tableData, columns, widgetTitle

Process:
1. Validate data (non-empty check)
2. Map data to include only visible columns
3. Format values (handle null, objects)
4. Convert to CSV using Papa.unparse()
5. Create Blob with CSV mime type
6. Generate timestamped filename
7. Trigger download with file-saver

Output: Downloaded CSV file
```

### PDF Export (Tables)
```javascript
Input: tableData, columns, widgetTitle

Process:
1. Create jsPDF instance
2. Add title (font size 16)
3. Format columns and rows
4. Use autoTable plugin with styling:
   - Header: Blue background (#1890ff)
   - Alternating rows: Light gray
   - Cell padding, font size
5. Generate blob
6. Trigger download

Output: Downloaded PDF file with formatted table
```

### PDF Export (Graphs)
```javascript
Input: graphElement (DOM ref), widgetTitle

Process:
1. Capture DOM element with html2canvas
   - Scale: 2 (high resolution)
   - Background: white
2. Calculate image dimensions for A4
3. Create jsPDF instance
4. Add title
5. Add captured image
6. Generate blob
7. Trigger download

Output: Downloaded PDF with graph image
```

### Image Export (Graphs)
```javascript
Input: graphElement, format (png/jpg), widgetTitle

Process:
1. Capture DOM element with html2canvas
   - Scale: 2
   - Quality: 0.95 (for JPG)
2. Convert canvas to Blob
   - PNG: lossless
   - JPG: with compression
3. Generate filename
4. Trigger download

Output: Downloaded PNG or JPG file
```

## Share Implementation Details

### Web Share API Flow
```javascript
1. Check if navigator.share exists
2. Check if file sharing is supported (canShare)
3. Create File object from Blob
4. Prepare share data (file, title, text)
5. Call navigator.share(shareData)
6. Handle success/cancellation/error
```

### Fallback Flow (No Web Share API)
```javascript
Email:
  - Open mailto: with subject and body
  - Prompt user to attach downloaded file

WhatsApp/Telegram:
  - Show instructions alert
  - Download file automatically
  - User manually attaches in app
```

## UI/UX Patterns

### Hover Interaction
```
Default State:
- Widget: Normal shadow
- Menu: Hidden

Hover State:
- Widget: Enhanced shadow (0 4px 12px)
- Menu: Visible (3-dot icon)
- Transition: 0.3s ease

Exporting State:
- Menu: Always visible but disabled
- Spinner: Visible over content
```

### Menu Structure
```
Dropdown (Ant Design)
├─ Download (submenu)
│  ├─ CSV (tables only)
│  ├─ PDF (both)
│  ├─ PNG (graphs only)
│  └─ JPG (graphs only)
└─ Share (submenu)
   ├─ WhatsApp
   ├─ Email
   └─ Telegram
```

## Error Handling Strategy

### Validation
```javascript
Pre-export:
- Check if data exists
- Check if data is non-empty
- Validate data structure

Error Response:
- Return { valid: false, error: "message" }
- Display toast notification
- Log to console for debugging
```

### Try-Catch Blocks
```javascript
All export functions wrapped in try-catch:

try {
  // Export logic
  return { success: true, ... }
} catch (error) {
  console.error('Export error:', error)
  message.error(MESSAGES.EXPORT_ERROR)
  return { success: false, error }
}
```

### User Feedback
```javascript
Loading: message.loading()
Success: message.success()
Error: message.error()
Warning: message.warning()

Auto-dismiss: 3 seconds
Position: Top center
Max count: 3 concurrent
```

## Performance Considerations

### Optimization Opportunities
1. **Lazy Loading**: Load export libraries on-demand
2. **Memoization**: Cache expensive calculations
3. **Web Workers**: Process large exports in background
4. **Code Splitting**: Separate export utilities bundle

### Current Performance
- Export libraries: ~150KB combined (gzipped)
- html2canvas: ~50KB (gzipped)
- Recharts: ~100KB (gzipped)
- Total bundle impact: ~300KB

### Export Times (Approximate)
- CSV (8 rows): < 100ms
- PDF Table (8 rows): < 200ms
- PDF Graph: 500ms - 1s (capture + generation)
- PNG/JPG: 300ms - 800ms (depends on chart complexity)

## Browser Compatibility

### Required Features
- ES6+ (arrow functions, destructuring, optional chaining)
- React 19.1.1
- Ant Design 5.27.6
- HTML5 Canvas API
- Blob and File APIs
- Download attribute

### Progressive Enhancement
- Web Share API: Feature detection
- Fallback: Traditional download
- Canvas support: Required (modern browsers)

## Security Considerations

### Data Privacy
- All processing client-side
- No data sent to external servers
- Share via Web API (browser controls)

### Input Sanitization
- Filename sanitization (remove special chars)
- Data validation before export
- Error messages don't expose internals

### Safe Operations
- Read-only data access
- No eval() or dangerous code
- Dependencies from trusted sources

## Testing Strategy

### Unit Tests (Recommended)
```javascript
Export Utilities:
- csvExporter: Test Papa integration
- pdfExporter: Test jsPDF output
- imageExporter: Test canvas capture
- exportHelpers: Test validation logic

Hooks:
- useTableExport: Mock export functions
- useGraphExport: Mock ref and capture
- useShare: Mock Web Share API

Components:
- Widget: Test hover state
- WidgetOptionsMenu: Test menu rendering
```

### Integration Tests (Recommended)
```javascript
Full Export Flow:
- Click download → file downloads
- Click share → share dialog opens
- Error scenario → error message shows
```

### Manual Testing Checklist
✅ Widget hover shows menu
✅ CSV download works
✅ PDF downloads work (table & graph)
✅ Image downloads work
✅ Share dialogs open
✅ Success messages display
✅ Error handling works
✅ Loading states show
✅ Responsive on mobile

## Extensibility

### Adding New Widget Types
```javascript
1. Create widget component (e.g., MapWidget)
2. Create export hook (e.g., useMapExport)
3. Add widget type to constants
4. Implement export utilities
5. Update menu options
6. Add to Dashboard
```

### Adding New Export Formats
```javascript
1. Add format to exportConstants
2. Create exporter utility
3. Update menu submenu
4. Update widget export hook
5. Test with widget type
```

### Adding New Share Platforms
```javascript
1. Add platform to shareConstants
2. Update shareHandler logic
3. Add menu option with icon
4. Test share integration
```

## Dependencies

### Core
- react: 19.1.1
- react-dom: 19.1.1
- react-router-dom: 7.9.4

### UI
- antd: 5.27.6
- @ant-design/icons: 6.1.0
- recharts: 3.3.0

### Export
- papaparse: 5.5.3
- jspdf: 3.0.3
- jspdf-autotable: 5.0.2
- html2canvas: 1.4.1
- file-saver: 2.0.5

### Build
- vite: rolldown-vite@7.1.14
- @vitejs/plugin-react: 5.0.4

## Code Standards

### DigiQC Compliance
✅ Optional chaining (?.): Used throughout
✅ Functional components: All components
✅ React hooks: useState, useEffect, useRef
✅ Zero ESLint warnings: Verified
✅ Ant Design patterns: Following v5 best practices
✅ Error handling: Try-catch blocks
✅ Clean structure: Single responsibility

### Naming Conventions
- Components: PascalCase (TableWidget)
- Hooks: camelCase with 'use' prefix (useTableExport)
- Files: Match component name (TableWidget.jsx)
- Constants: SCREAMING_SNAKE_CASE (WIDGET_TYPES)
- Functions: camelCase (exportTableToCSV)

## Future Enhancements

### Planned Features
- Batch export (multiple widgets)
- Custom templates
- Scheduled exports
- Cloud storage integration
- Export history
- Advanced filtering
- Custom branding

### Infrastructure Improvements
- Unit test suite
- E2E test automation
- Performance monitoring
- Error tracking
- Usage analytics
- A/B testing framework

---

**Architecture Status**: Production Ready
**Last Updated**: 2025-10-29
**Version**: 1.0.0
