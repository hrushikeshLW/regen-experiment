/**
 * Generate a standardized filename for exports
 */
export const generateFileName = (widgetTitle, format, timestamp = Date.now()) => {
  const sanitizedTitle = sanitizeFileName(widgetTitle)
  const date = new Date(timestamp)
  const dateStr = date.toISOString().split('T')[0]
  const timeStr = date.toTimeString().split(' ')[0].replace(/:/g, '-')

  return `${sanitizedTitle}_${dateStr}_${timeStr}.${format}`
}

/**
 * Sanitize filename by removing invalid characters
 */
export const sanitizeFileName = (filename) => {
  return filename
    ?.replace(/[^a-z0-9_-]/gi, '_')
    ?.replace(/_+/g, '_')
    ?.toLowerCase() || 'export'
}

/**
 * Validate export data
 */
export const validateExportData = (data) => {
  if (!data) {
    return { valid: false, error: 'No data provided' }
  }

  if (Array.isArray(data) && data.length === 0) {
    return { valid: false, error: 'Data array is empty' }
  }

  return { valid: true }
}

/**
 * Prepare table data for export
 */
export const prepareTableData = (rawData, columns, filters = {}) => {
  let data = [...rawData]

  // Apply filters if any
  if (filters && Object.keys(filters).length > 0) {
    data = data.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true
        return String(row[key])?.toLowerCase()?.includes(String(value)?.toLowerCase())
      })
    })
  }

  // Select only visible columns
  if (columns && columns.length > 0) {
    data = data.map(row => {
      const newRow = {}
      columns.forEach(col => {
        newRow[col.dataIndex] = row[col.dataIndex]
      })
      return newRow
    })
  }

  return data
}

/**
 * Handle export errors consistently
 */
export const handleExportError = (error, widgetType) => {
  console.error(`Export error for ${widgetType}:`, error)

  return {
    success: false,
    error: error?.message || 'Unknown export error',
    widgetType,
  }
}

/**
 * Format data value for display
 */
export const formatDataValue = (value) => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}
