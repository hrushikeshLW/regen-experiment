# Implementation Plan: Download and Share Dashboard Widget

**ClickUp Task ID:** 86d0t17zp
**Task URL:** https://app.clickup.com/t/86d0t17zp
**Status:** Open
**Assignee:** Hrushikesh yadav

## 1. Task Overview

### 1.1 User Story

As a web dashboard user, I want to download or share individual dashboard widgets (table or graph) directly from the web dashboard, so that I can quickly share insights or data snapshots with external stakeholders through apps like WhatsApp, Email, or Telegram.

### 1.2 Feature Summary

Enable users to export and share specific dashboard widgets without downloading the entire dashboard. The feature supports:

- **Table Widgets**: Download as CSV or PDF, Share as PDF
- **Graph Widgets**: Download as PDF or Image (JPG/PNG), Share as Image

### 1.3 Key Objectives

- Add export/share functionality to individual widgets
- Support multiple file formats based on widget type
- Enable direct sharing to common communication platforms
- Provide user feedback for success and error states

## 2. Technical Requirements

### 2.1 Functional Requirements

#### Widget Actions Menu

- Display 3-dot options menu on widget hover/click
- Menu visible only on individual widgets, not full dashboard
- Options vary based on widget type (table vs. graph)

#### Table Widget Actions

- **Download CSV**: Export all visible columns and applied filters
- **Download PDF**: Generate formatted PDF matching UI view
- **Share**: Generate PDF and enable sharing via WhatsApp/Email/Telegram

#### Graph Widget Actions

- **Download PDF**: Generate high-resolution PDF snapshot
- **Download Image**: Export as JPG or PNG with same dimensions as visible chart
- **Share**: Export as image and enable sharing via WhatsApp/Email/Telegram

#### User Feedback

- Success toast: "File downloaded successfully." (on download)
- Success toast: "Widget shared successfully." (on share)
- Error alert: "Unable to export data right now. Please try again." (on failure)

### 2.2 Technology Stack Considerations

#### Current Stack

- React 19.1.1
- Vite (rolldown-vite@7.1.14)
- Fresh project with minimal dependencies

#### Required Dependencies

- **Ant Design**: UI component library for menus, dropdowns, modals, and toasts
- **Chart Library**: For graph rendering (recommend Recharts or Chart.js)
- **Export Libraries**:
  - `html2canvas`: For capturing widget screenshots
  - `jspdf`: For PDF generation
  - `jspdf-autotable`: For table PDF formatting
  - `papaparse` or `json2csv`: For CSV export
  - `file-saver`: For file download handling
- **Share API**: Web Share API for native sharing capabilities

### 2.3 Technical Constraints

- Must maintain existing dashboard layout and functionality
- Export should capture current widget state (filters, sorting, etc.)
- File generation must be client-side for performance
- Support modern browsers with fallback for unsupported features
- Mobile responsiveness for share functionality

## 3. Architecture and Design Considerations

### 3.1 Component Architecture

#### Key Directory Structure

```
src/
├── modules/           # Feature-based modules
├── components/        # Shared/reusable components
├── common/           # Utilities, constants, hooks
├── styles/           # LESS stylesheets and themes
├── assets/           # Images, SVGs, static assets
└── app/              # Main app layout and routing
```

#### Module Structure Pattern

```
/src/modules/dashboard/
├── components/
│   ├── Dashboard.jsx                     # Main dashboard container
│   ├── DashboardGrid.jsx                # Widget grid layout
│   ├── Widget.jsx                       # Base widget wrapper component
│   ├── WidgetOptionsMenu.jsx            # 3-dot menu component
│   ├── TableWidget.jsx                  # Table widget implementation
│   ├── GraphWidget.jsx                  # Graph widget implementation
│   ├── ExportDropdown.jsx               # Export options dropdown
│   ├── DownloadSubMenu.jsx              # Download format submenu
│   └── ShareSubMenu.jsx                 # Share platform submenu
├── graphql/
│   ├── Queries.js                       # Dashboard queries (if needed)
│   └── Mutations.js                     # Dashboard mutations (if needed)
└── dashboard.js                         # Main module entry
```

#### Common Utilities Structure

```
/src/common/
├── hooks/
│   ├── useWidgetExport.js               # Export logic hook
│   ├── useTableExport.js                # Table-specific export
│   ├── useGraphExport.js                # Graph-specific export
│   └── useShare.js                      # Share functionality hook
├── utils/
│   ├── export/
│   │   ├── csvExporter.js               # CSV generation utility
│   │   ├── pdfExporter.js               # PDF generation utility
│   │   ├── imageExporter.js             # Image capture utility
│   │   └── exportHelpers.js             # Common export utilities
│   ├── share/
│   │   ├── shareHandler.js              # Web Share API integration
│   │   └── shareHelpers.js              # Share utilities
│   └── types/
│       └── widget.types.js              # TypeScript types/PropTypes
└── constants/
    └── exportConstants.js               # Export-related constants
```

### 3.2 Component Design Patterns

#### Widget Wrapper Pattern

- Use HOC or render props to wrap existing widgets
- Inject export/share functionality without modifying widget internals
- Maintain separation of concerns between widget content and actions

#### Composition Pattern

- WidgetOptionsMenu composed of ExportDropdown, DownloadSubMenu, ShareSubMenu
- Reusable menu components across different widget types
- Context-aware rendering based on widget type

### 3.3 State Management Strategy

#### Local Component State

- Widget hover/active state
- Menu open/closed state
- Export progress indicators

#### Export Context (if needed for complex state)

- Current export operation
- Export queue for batch operations
- Global export settings (default format preferences)

### 3.4 Data Flow

```
User Interaction → Widget → OptionsMenu → Export/Share Handler
                                              ↓
                                         Utility Functions
                                         (CSV/PDF/Image)
                                              ↓
                                         File Generation
                                              ↓
                                    Download / Share Action
                                              ↓
                                         User Feedback
                                         (Toast/Alert)
```

## 4. Implementation Phases

### Phase 1: Foundation Setup

#### 1.1 Install Core Dependencies

```bash
npm install antd
npm install recharts  # or chart.js based on preference
npm install html2canvas jspdf jspdf-autotable
npm install papaparse file-saver
```

#### 1.2 Configure Ant Design

- Set up Ant Design theme configuration in `/src/main.jsx` or `/src/app/App.jsx`
- Configure ConfigProvider for consistent styling
- Import necessary Ant Design CSS

#### 1.3 Create Base Widget Component Structure

- **File**: `/src/modules/dashboard/components/Widget.jsx`
- Establish widget wrapper component with common props interface
- Add widget type identification (table, graph, etc.)
- Implement base styling and layout

#### 1.4 Set Up TypeScript Types/PropTypes

- **File**: `/src/common/utils/types/widget.types.js`
- Define widget data structures
- Define export options types
- Define share platform enums

### Phase 2: Widget Options Menu Implementation

#### 2.1 Create WidgetOptionsMenu Component

- **File**: `/src/modules/dashboard/components/WidgetOptionsMenu.jsx`
- Use Ant Design Dropdown component with custom trigger
- Implement 3-dot icon (MoreOutlined from @ant-design/icons)
- Add hover/click state management
- Position menu relative to widget

#### 2.2 Implement ExportDropdown Component

- **File**: `/src/modules/dashboard/components/ExportDropdown.jsx`
- Use Ant Design Menu component
- Create dynamic menu items based on widget type
- Implement nested sub-menus for Download and Share options

#### 2.3 Create DownloadSubMenu Component

- **File**: `/src/modules/dashboard/components/DownloadSubMenu.jsx`
- Conditional rendering based on widget type:
  - Table: CSV, PDF options
  - Graph: PDF, Image (JPG/PNG) options
- Menu item icons and labels

#### 2.4 Create ShareSubMenu Component

- **File**: `/src/modules/dashboard/components/ShareSubMenu.jsx`
- Share platform options: WhatsApp, Email, Telegram
- Platform icons using Ant Design icons or custom icons
- Conditional file format based on widget type

### Phase 3: Export Utilities Implementation

#### 3.1 CSV Export Utility

- **File**: `/src/common/utils/export/csvExporter.js`
- Function: `exportTableToCSV(tableData, columns, filters)`
- Use PapaParse to convert JSON to CSV
- Handle column visibility and filtering
- Respect current sort order
- Generate filename with timestamp
- Trigger browser download using file-saver

#### 3.2 PDF Export Utility - Tables

- **File**: `/src/common/utils/export/pdfExporter.js`
- Function: `exportTableToPDF(tableData, columns, widgetTitle)`
- Use jsPDF with jsPDF-AutoTable plugin
- Format table matching UI styling
- Include widget title/header
- Add pagination for large tables
- Handle column widths proportionally
- Generate high-quality output

#### 3.3 PDF Export Utility - Graphs

- Function: `exportGraphToPDF(graphElement, widgetTitle)`
- Use html2canvas to capture graph as image
- Convert canvas to PDF using jsPDF
- Maintain aspect ratio and resolution
- Include widget title
- Optimize for print quality (high DPI)

#### 3.4 Image Export Utility

- **File**: `/src/common/utils/export/imageExporter.js`
- Function: `exportGraphToImage(graphElement, format, widgetTitle)`
- Use html2canvas to capture graph
- Support JPG and PNG formats
- Match visible dimensions
- Generate filename with widget title and timestamp
- Optimize image quality

#### 3.5 Export Helper Utilities

- **File**: `/src/common/utils/export/exportHelpers.js`
- `generateFileName(widgetTitle, format, timestamp)`: Standardized filename generation
- `sanitizeFileName(filename)`: Remove invalid characters
- `validateExportData(data)`: Pre-export data validation
- `handleExportError(error, widgetType)`: Centralized error handling
- `prepareTableData(rawData, columns, filters)`: Data preparation for table export

### Phase 4: Share Functionality Implementation

#### 4.1 Share Handler Utility

- **File**: `/src/common/utils/share/shareHandler.js`
- Function: `shareWidget(fileBlob, platform, widgetTitle)`
- Detect Web Share API support
- Fallback for unsupported browsers
- Platform-specific handling:
  - **WhatsApp**: Use Web Share API or WhatsApp URL scheme
  - **Email**: Use mailto: with attachment or Web Share API
  - **Telegram**: Use Telegram share URL or Web Share API

#### 4.2 Share Helper Utilities

- **File**: `/src/common/utils/share/shareHelpers.js`
- `isWebShareSupported()`: Check browser support
- `prepareShareData(file, title, text)`: Format share data
- `getShareUrlForPlatform(platform, fileUrl)`: Generate platform-specific URLs
- `handleShareError(error, platform)`: Share error handling

#### 4.3 useShare Custom Hook

- **File**: `/src/common/hooks/useShare.js`
- Encapsulate share logic
- Handle file conversion for sharing
- Manage share state (loading, success, error)
- Return share function and state

### Phase 5: Widget-Specific Export Hooks

#### 5.1 useTableExport Hook

- **File**: `/src/common/hooks/useTableExport.js`
- `exportAsCSV()`: Trigger CSV export
- `exportAsPDF()`: Trigger PDF export
- `shareTable(platform)`: Share table as PDF
- Handle loading states
- Error handling and user feedback
- Access current table state (data, columns, filters, sorting)

#### 5.2 useGraphExport Hook

- **File**: `/src/common/hooks/useGraphExport.js`
- `exportAsPDF()`: Trigger PDF export
- `exportAsImage(format)`: Trigger image export (JPG/PNG)
- `shareGraph(platform)`: Share graph as image
- Handle canvas rendering
- Loading states during capture
- Error handling and feedback

#### 5.3 useWidgetExport Hook (Abstraction Layer)

- **File**: `/src/common/hooks/useWidgetExport.js`
- Abstract hook that delegates to useTableExport or useGraphExport
- Accepts widget type and data
- Returns appropriate export methods
- Unified error handling and feedback

### Phase 6: User Feedback System

#### 6.1 Toast Notifications

- Use Ant Design message component for success toasts
- Configure global message settings in App.jsx
- Success messages:
  - "File downloaded successfully."
  - "Widget shared successfully."
- Auto-dismiss after 3 seconds
- Position: top-center or top-right

#### 6.2 Error Handling

- Use Ant Design Modal.error or notification for errors
- Error message: "Unable to export data right now. Please try again."
- Include retry option when applicable
- Log errors to console for debugging

#### 6.3 Loading States

- Show loading spinner during export/share operations
- Disable menu items during processing
- Use Ant Design Spin component for loading indicators

### Phase 7: Widget Integration

#### 7.1 Update TableWidget Component

- **File**: `/src/modules/dashboard/components/TableWidget.jsx`
- Integrate WidgetOptionsMenu
- Connect useTableExport hook
- Pass table data, columns, filters to export functions
- Ensure menu positioning is correct

#### 7.2 Update GraphWidget Component

- **File**: `/src/modules/dashboard/components/GraphWidget.jsx`
- Integrate WidgetOptionsMenu
- Connect useGraphExport hook
- Pass graph element ref for capture
- Ensure chart library compatibility with html2canvas

#### 7.3 Update Base Widget Component

- **File**: `/src/modules/dashboard/components/Widget.jsx`
- Add common props: widgetTitle, widgetType, data
- Integrate options menu into widget header/corner
- Add hover state styling
- Ensure responsive design

### Phase 8: Styling and UX Polish

#### 8.1 Widget Options Menu Styling

- Position 3-dot icon in top-right corner of widget
- Show on hover with smooth transition
- Mobile: Make icon always visible or accessible via tap
- Use consistent icon sizing and spacing

#### 8.2 Menu Interaction Design

- Smooth dropdown animations
- Clear visual hierarchy in nested menus
- Highlight selected/hovered items
- Close menu after action selection
- Keyboard navigation support

#### 8.3 Responsive Design

- Ensure menu works on mobile devices
- Touch-friendly target sizes
- Adapt share options for mobile capabilities
- Handle small screen layouts

### Phase 9: Error Handling and Edge Cases

#### 9.1 Export Validation

- Check if widget has data before export
- Validate data format and structure
- Handle empty tables/graphs gracefully
- Alert user if export would be empty

#### 9.2 Browser Compatibility

- Test Web Share API support
- Provide fallbacks for older browsers
- Handle popup blockers for share/download
- Test across Chrome, Firefox, Safari, Edge

#### 9.3 File Size Management

- Warn if export file is very large
- Implement pagination for large tables in PDF
- Optimize image quality vs. file size
- Consider compression for large exports

#### 9.4 Permission Handling

- Handle browser download permissions
- Handle share permission requests
- Provide clear feedback if permissions denied

## 5. Technical Challenges and Solutions

### Challenge 1: High-Quality Graph Capture

**Problem**: html2canvas may not capture complex graphs accurately, especially with SVG elements or animations.

**Solutions**:

- Pre-render graph to static state before capture
- Increase scale factor for html2canvas (e.g., scale: 2 or 3)
- Consider native chart export methods if chart library provides them
- Use SVG-to-canvas conversion libraries for SVG charts
- Test with specific chart library's export capabilities

### Challenge 2: PDF Table Formatting

**Problem**: Maintaining UI styling in exported PDF tables can be complex.

**Solutions**:

- Use jsPDF-AutoTable's styling options to match UI theme
- Extract CSS styles from actual table elements
- Create custom styling function that mirrors UI theme
- Test with various table sizes and column counts
- Handle column overflow with automatic scaling or wrapping

### Challenge 3: Mobile Share API Limitations

**Problem**: Web Share API has limited support and restrictions on file types/sizes.

**Solutions**:

- Feature detection before enabling share functionality
- Fallback to download + manual share instructions
- For email: Use mailto: links with file hosted temporarily
- For WhatsApp/Telegram: Generate shareable links if files are too large
- Clear messaging when native share is unavailable

### Challenge 4: Large Data Exports

**Problem**: Exporting widgets with large datasets may cause browser performance issues.

**Solutions**:

- Implement chunking for large CSV exports
- Add loading indicators for long operations
- Use Web Workers for heavy processing
- Set reasonable limits on export size
- Warn users before exporting very large datasets

### Challenge 5: Dynamic Column Visibility and Filtering

**Problem**: Ensuring exported data matches exactly what user sees with applied filters.

**Solutions**:

- Capture complete table state including filters and sorting
- Apply filters before export generation
- Include filter information in export metadata
- Test with various filter combinations
- Document what is included in exports

## 6. Dependencies and Prerequisites

### 6.1 External Dependencies

1. Dashboard implementation with widget system
2. Existing table and graph components
3. Data management system for widgets
4. Consistent data structure for table and graph widgets

### 6.2 Technical Prerequisites

- Node.js and npm configured
- React development environment set up
- Build system configured (Vite)
- Modern browser for testing (Chrome/Firefox/Safari)

### 6.3 Design Assets

- 3-dot menu icon (or use Ant Design MoreOutlined)
- Platform share icons (WhatsApp, Email, Telegram)
- Loading spinners and success/error icons (from Ant Design)

## 7. Risk Assessment and Mitigation

### Risk 1: Browser Compatibility Issues

**Impact**: High
**Probability**: Medium
**Mitigation**:

- Comprehensive cross-browser verification
- Implement feature detection and fallbacks
- Use well-tested libraries with good browser support
- Provide clear error messages for unsupported features

### Risk 2: Performance Degradation with Large Widgets

**Impact**: High
**Probability**: Medium
**Mitigation**:

- Implement performance optimization early
- Set reasonable data size limits
- Use Web Workers for heavy processing
- Profile and optimize before deployment
- Add loading states for user feedback

### Risk 3: Export Quality Issues

**Impact**: Medium
**Probability**: Medium
**Mitigation**:

- Extensive manual verification with various widget configurations
- Use high-resolution capture settings
- Test with real-world data scenarios
- Gather user feedback during development
- Iterate on quality improvements

### Risk 4: Mobile Usability Challenges

**Impact**: Medium
**Probability**: Low
**Mitigation**:

- Design mobile-first interactions
- Test on actual mobile devices
- Provide alternative UX for mobile limitations
- Ensure touch-friendly UI elements

### Risk 5: Third-Party Library Updates Breaking Functionality

**Impact**: Medium
**Probability**: Low
**Mitigation**:

- Pin dependency versions in package.json
- Test thoroughly after any dependency updates
- Monitor library issue trackers
- Have fallback implementations ready

## 8. Acceptance Criteria Mapping

| AC #  | Scenario                                 | Implementation Components                             |
| ----- | ---------------------------------------- | ----------------------------------------------------- |
| AC-1  | 3-dot Options menu on widget hover/click | WidgetOptionsMenu.jsx, Widget.jsx hover state         |
| AC-2  | Table Widget - Download CSV              | csvExporter.js, useTableExport.js, ExportDropdown.jsx |
| AC-3  | Table Widget - Download PDF              | pdfExporter.js (table), useTableExport.js             |
| AC-4  | Table Widget - Share                     | shareHandler.js, useTableExport.js, ShareSubMenu.jsx  |
| AC-5  | Graph Widget - Download PDF              | pdfExporter.js (graph), useGraphExport.js             |
| AC-6  | Graph Widget - Download Image            | imageExporter.js, useGraphExport.js                   |
| AC-7  | Graph Widget - Share                     | shareHandler.js, useGraphExport.js, ShareSubMenu.jsx  |
| AC-8  | Export failure handling                  | Error handlers in all export utilities                |
| AC-9  | Success toast on download                | Ant Design message in export hooks                    |
| AC-10 | Success toast on share                   | Ant Design message in useShare.js                     |

## 9. Implementation Sequence

### Recommended Order

1. **Phase 1**: Install dependencies and set up project structure
2. **Phase 3**: Build export utilities (can be developed and unit-tested independently)
3. **Phase 2**: Create UI components for options menu
4. **Phase 5**: Develop export hooks to connect utilities with components
5. **Phase 4**: Implement share functionality
6. **Phase 6**: Add user feedback system
7. **Phase 7**: Integrate everything into widget components
8. **Phase 8**: Polish styling and UX
9. **Phase 9**: Handle edge cases and finalize error handling

### Rationale

- Build utilities first for isolated unit-testing verification
- UI components can reference utilities for understanding API
- Hooks bridge utilities and UI with proper state management
- Integration happens after all pieces are verified individually
- Polish and edge cases last to avoid premature optimization

## 10. Key Implementation Notes

### Code Quality Standards

- Use functional components with React Hooks
- Implement proper error boundaries
- Write clear comments for complex logic
- Follow existing project coding conventions
- Keep components small and focused (Single Responsibility Principle)

### Performance Considerations

- Lazy load export libraries only when needed
- Implement memoization for expensive computations
- Debounce menu interactions if necessary
- Optimize re-renders with React.memo where appropriate
- Profile export operations for large datasets

### Accessibility

- Ensure keyboard navigation for all menus
- Add proper ARIA labels to buttons and menus
- Provide screen reader feedback for export actions
- Maintain sufficient color contrast
- Support focus management

### Security Considerations

- Sanitize filenames to prevent injection attacks
- Validate data before export
- Handle user data privacy in exports
- Be cautious with data shared to external platforms
- Don't expose sensitive information in error messages

## 11. Post-Implementation Considerations

### Monitoring Points

- Track export success/failure rates
- Monitor export operation duration
- Log browser compatibility issues
- Track which export formats are most used
- Monitor share platform preferences

### Future Enhancements (Out of Scope)

- Batch export multiple widgets
- Custom export templates
- Scheduled/automated exports
- Cloud storage integration
- Export history and management
- Advanced filtering in exports
- Custom branding in exported files

### Documentation Needs

- User guide for export/share features
- Developer documentation for export utilities
- API documentation for export hooks
- Troubleshooting guide for common issues

---

## Quick Reference: File Checklist

### Dashboard Module Components to Create/Modify

- [ ] `/src/modules/dashboard/components/Dashboard.jsx`
- [ ] `/src/modules/dashboard/components/DashboardGrid.jsx`
- [ ] `/src/modules/dashboard/components/Widget.jsx`
- [ ] `/src/modules/dashboard/components/WidgetOptionsMenu.jsx`
- [ ] `/src/modules/dashboard/components/TableWidget.jsx`
- [ ] `/src/modules/dashboard/components/GraphWidget.jsx`
- [ ] `/src/modules/dashboard/components/ExportDropdown.jsx`
- [ ] `/src/modules/dashboard/components/DownloadSubMenu.jsx`
- [ ] `/src/modules/dashboard/components/ShareSubMenu.jsx`
- [ ] `/src/modules/dashboard/dashboard.js` (main module entry)

### Common Utilities to Create

- [ ] `/src/common/utils/export/csvExporter.js`
- [ ] `/src/common/utils/export/pdfExporter.js`
- [ ] `/src/common/utils/export/imageExporter.js`
- [ ] `/src/common/utils/export/exportHelpers.js`
- [ ] `/src/common/utils/share/shareHandler.js`
- [ ] `/src/common/utils/share/shareHelpers.js`

### Common Hooks to Create

- [ ] `/src/common/hooks/useWidgetExport.js`
- [ ] `/src/common/hooks/useTableExport.js`
- [ ] `/src/common/hooks/useGraphExport.js`
- [ ] `/src/common/hooks/useShare.js`

### Types/Constants to Create

- [ ] `/src/common/utils/types/widget.types.js`
- [ ] `/src/common/constants/exportConstants.js`

### Configuration Files to Update

- [ ] `/src/main.jsx` or `/src/app/App.jsx` (Ant Design configuration)
- [ ] `package.json` (dependencies)

---

**Plan Status**: Ready for Implementation
**Last Updated**: 2025-10-29
