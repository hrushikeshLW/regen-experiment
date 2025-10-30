// Widget types
export const WIDGET_TYPES = {
  TABLE: 'table',
  GRAPH: 'graph',
}

// Export formats
export const EXPORT_FORMATS = {
  CSV: 'csv',
  PDF: 'pdf',
  JPG: 'jpg',
  PNG: 'png',
}

// Share platforms
export const SHARE_PLATFORMS = {
  WHATSAPP: 'whatsapp',
  EMAIL: 'email',
  TELEGRAM: 'telegram',
}

// User feedback messages
export const MESSAGES = {
  DOWNLOAD_SUCCESS: 'File downloaded successfully.',
  SHARE_SUCCESS: 'Widget shared successfully.',
  EXPORT_ERROR: 'Unable to export data right now. Please try again.',
  SHARE_ERROR: 'Unable to share widget right now. Please try again.',
  NO_DATA: 'No data available to export.',
  PREPARING_EXPORT: 'Preparing export...',
}

// Export options configuration
export const TABLE_EXPORT_OPTIONS = [
  { key: EXPORT_FORMATS.CSV, label: 'Download CSV' },
  { key: EXPORT_FORMATS.PDF, label: 'Download PDF' },
]

export const GRAPH_EXPORT_OPTIONS = [
  { key: EXPORT_FORMATS.PDF, label: 'Download PDF' },
  { key: EXPORT_FORMATS.PNG, label: 'Download PNG' },
  { key: EXPORT_FORMATS.JPG, label: 'Download JPG' },
]

// Share options configuration
export const SHARE_OPTIONS = [
  { key: SHARE_PLATFORMS.WHATSAPP, label: 'WhatsApp' },
  { key: SHARE_PLATFORMS.EMAIL, label: 'Email' },
  { key: SHARE_PLATFORMS.TELEGRAM, label: 'Telegram' },
]

// PDF configuration
export const PDF_CONFIG = {
  ORIENTATION: 'portrait',
  UNIT: 'mm',
  FORMAT: 'a4',
  MARGIN: { top: 15, right: 10, bottom: 10, left: 10 },
  FONT_SIZE: {
    TITLE: 16,
    NORMAL: 10,
  },
}

// Image export configuration
export const IMAGE_CONFIG = {
  SCALE: 2, // Higher scale for better quality
  BACKGROUND_COLOR: '#ffffff',
  QUALITY: 0.95, // For JPG compression
}
