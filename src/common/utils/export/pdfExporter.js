import jsPDF from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'
import { generateFileName, validateExportData, formatDataValue } from './exportHelpers'
import { PDF_CONFIG } from '../../constants/exportConstants'

/**
 * Export table data to PDF format
 */
export const exportTableToPDF = async (tableData, columns, widgetTitle) => {
  try {
    // Validate data
    const validation = validateExportData(tableData)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    // Create PDF document
    const doc = new jsPDF({
      orientation: PDF_CONFIG.ORIENTATION,
      unit: PDF_CONFIG.UNIT,
      format: PDF_CONFIG.FORMAT,
    })

    // Add title
    doc.setFontSize(PDF_CONFIG.FONT_SIZE.TITLE)
    doc.text(widgetTitle, PDF_CONFIG.MARGIN.left, PDF_CONFIG.MARGIN.top)

    // Prepare table headers and body
    const headers = columns.map(col => col.title)
    const body = tableData.map(row =>
      columns.map(col => formatDataValue(row[col.dataIndex]))
    )

    // Add table to PDF
    doc.autoTable({
      head: [headers],
      body: body,
      startY: PDF_CONFIG.MARGIN.top + 10,
      margin: { left: PDF_CONFIG.MARGIN.left, right: PDF_CONFIG.MARGIN.right },
      styles: {
        fontSize: PDF_CONFIG.FONT_SIZE.NORMAL,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [24, 144, 255],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    })

    // Generate blob and download
    const pdfBlob = doc.output('blob')
    const filename = generateFileName(widgetTitle, 'pdf')

    saveAs(pdfBlob, filename)

    return {
      success: true,
      filename,
      format: 'pdf',
      blob: pdfBlob,
    }
  } catch (error) {
    console.error('PDF table export error:', error)
    throw error
  }
}

/**
 * Export graph element to PDF format
 */
export const exportGraphToPDF = async (graphElement, widgetTitle) => {
  try {
    if (!graphElement) {
      throw new Error('Graph element not found')
    }

    // Capture graph as canvas
    const canvas = await html2canvas(graphElement, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
    })

    // Calculate dimensions
    const imgWidth = 190 // A4 width minus margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Create PDF
    const doc = new jsPDF({
      orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
      unit: PDF_CONFIG.UNIT,
      format: PDF_CONFIG.FORMAT,
    })

    // Add title
    doc.setFontSize(PDF_CONFIG.FONT_SIZE.TITLE)
    doc.text(widgetTitle, PDF_CONFIG.MARGIN.left, PDF_CONFIG.MARGIN.top)

    // Add image
    const imgData = canvas.toDataURL('image/png')
    doc.addImage(
      imgData,
      'PNG',
      PDF_CONFIG.MARGIN.left,
      PDF_CONFIG.MARGIN.top + 10,
      imgWidth,
      imgHeight
    )

    // Generate blob and download
    const pdfBlob = doc.output('blob')
    const filename = generateFileName(widgetTitle, 'pdf')

    saveAs(pdfBlob, filename)

    return {
      success: true,
      filename,
      format: 'pdf',
      blob: pdfBlob,
    }
  } catch (error) {
    console.error('PDF graph export error:', error)
    throw error
  }
}
