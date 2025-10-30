import { useState } from 'react'
import { message } from 'antd'
import { exportTableToCSV } from '../utils/export/csvExporter'
import { exportTableToPDF } from '../utils/export/pdfExporter'
import { MESSAGES, EXPORT_FORMATS } from '../constants/exportConstants'
import useShare from './useShare'

/**
 * Custom hook for table widget export functionality
 */
const useTableExport = (tableData, columns, widgetTitle) => {
  const [isExporting, setIsExporting] = useState(false)
  const { share, isSharing } = useShare()

  const exportAsCSV = async () => {
    if (!tableData || tableData.length === 0) {
      message.warning(MESSAGES.NO_DATA)
      return { success: false }
    }

    setIsExporting(true)
    message.loading({ content: MESSAGES.PREPARING_EXPORT, key: 'export', duration: 0 })

    try {
      await exportTableToCSV(tableData, columns, widgetTitle)
      message.success({ content: MESSAGES.DOWNLOAD_SUCCESS, key: 'export' })
      return { success: true }
    } catch (error) {
      console.error('CSV export error:', error)
      message.error({ content: MESSAGES.EXPORT_ERROR, key: 'export' })
      return { success: false, error }
    } finally {
      setIsExporting(false)
    }
  }

  const exportAsPDF = async () => {
    if (!tableData || tableData.length === 0) {
      message.warning(MESSAGES.NO_DATA)
      return { success: false }
    }

    setIsExporting(true)
    message.loading({ content: MESSAGES.PREPARING_EXPORT, key: 'export', duration: 0 })

    try {
      const result = await exportTableToPDF(tableData, columns, widgetTitle)
      message.success({ content: MESSAGES.DOWNLOAD_SUCCESS, key: 'export' })
      return { success: true, result }
    } catch (error) {
      console.error('PDF export error:', error)
      message.error({ content: MESSAGES.EXPORT_ERROR, key: 'export' })
      return { success: false, error }
    } finally {
      setIsExporting(false)
    }
  }

  const shareTable = async (platform) => {
    if (!tableData || tableData.length === 0) {
      message.warning(MESSAGES.NO_DATA)
      return { success: false }
    }

    setIsExporting(true)
    message.loading({ content: 'Preparing to share...', key: 'share', duration: 0 })

    try {
      // Generate PDF for sharing
      const pdfResult = await exportTableToPDF(tableData, columns, widgetTitle)

      if (!pdfResult?.blob) {
        throw new Error('Failed to generate PDF for sharing')
      }

      message.destroy('share')

      // Share the PDF
      const shareResult = await share(pdfResult.blob, platform, widgetTitle, pdfResult.filename)

      return shareResult
    } catch (error) {
      console.error('Share table error:', error)
      message.error({ content: MESSAGES.SHARE_ERROR, key: 'share' })
      return { success: false, error }
    } finally {
      setIsExporting(false)
    }
  }

  return {
    exportAsCSV,
    exportAsPDF,
    shareTable,
    isExporting: isExporting || isSharing,
  }
}

export default useTableExport
