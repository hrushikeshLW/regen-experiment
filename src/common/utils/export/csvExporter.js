import Papa from 'papaparse'
import { saveAs } from 'file-saver'
import { generateFileName, validateExportData, formatDataValue } from './exportHelpers'

/**
 * Export table data to CSV format
 */
export const exportTableToCSV = async (tableData, columns, widgetTitle) => {
  try {
    // Validate data
    const validation = validateExportData(tableData)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    // Prepare data for export
    const exportData = tableData.map(row => {
      const formattedRow = {}
      columns.forEach(col => {
        formattedRow[col.title] = formatDataValue(row[col.dataIndex])
      })
      return formattedRow
    })

    // Convert to CSV
    const csv = Papa.unparse(exportData, {
      header: true,
      skipEmptyLines: true,
    })

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const filename = generateFileName(widgetTitle, 'csv')

    saveAs(blob, filename)

    return {
      success: true,
      filename,
      format: 'csv',
    }
  } catch (error) {
    console.error('CSV export error:', error)
    throw error
  }
}
