import { useState } from 'react'
import { message } from 'antd'
import { exportGraphToPDF } from '../utils/export/pdfExporter'
import { exportGraphToImage } from '../utils/export/imageExporter'
import { MESSAGES, EXPORT_FORMATS } from '../constants/exportConstants'
import useShare from './useShare'

/**
 * Custom hook for graph widget export functionality
 */
const useGraphExport = (graphRef, widgetTitle) => {
  const [isExporting, setIsExporting] = useState(false)
  const { share, isSharing } = useShare()

  const exportAsPDF = async () => {
    const graphElement = graphRef?.current

    if (!graphElement) {
      message.warning('Graph element not found')
      return { success: false }
    }

    setIsExporting(true)
    message.loading({ content: MESSAGES.PREPARING_EXPORT, key: 'export', duration: 0 })

    try {
      const result = await exportGraphToPDF(graphElement, widgetTitle)
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

  const exportAsImage = async (format = EXPORT_FORMATS.PNG) => {
    const graphElement = graphRef?.current

    if (!graphElement) {
      message.warning('Graph element not found')
      return { success: false }
    }

    setIsExporting(true)
    message.loading({ content: MESSAGES.PREPARING_EXPORT, key: 'export', duration: 0 })

    try {
      const result = await exportGraphToImage(graphElement, format, widgetTitle)
      message.success({ content: MESSAGES.DOWNLOAD_SUCCESS, key: 'export' })
      return { success: true, result }
    } catch (error) {
      console.error('Image export error:', error)
      message.error({ content: MESSAGES.EXPORT_ERROR, key: 'export' })
      return { success: false, error }
    } finally {
      setIsExporting(false)
    }
  }

  const shareGraph = async (platform) => {
    const graphElement = graphRef?.current

    if (!graphElement) {
      message.warning('Graph element not found')
      return { success: false }
    }

    setIsExporting(true)
    message.loading({ content: 'Preparing to share...', key: 'share', duration: 0 })

    try {
      // Generate PNG image for sharing
      const imageResult = await exportGraphToImage(graphElement, EXPORT_FORMATS.PNG, widgetTitle)

      if (!imageResult?.blob) {
        throw new Error('Failed to generate image for sharing')
      }

      message.destroy('share')

      // Share the image
      const shareResult = await share(
        imageResult.blob,
        platform,
        widgetTitle,
        imageResult.filename
      )

      return shareResult
    } catch (error) {
      console.error('Share graph error:', error)
      message.error({ content: MESSAGES.SHARE_ERROR, key: 'share' })
      return { success: false, error }
    } finally {
      setIsExporting(false)
    }
  }

  return {
    exportAsPDF,
    exportAsImage,
    shareGraph,
    isExporting: isExporting || isSharing,
  }
}

export default useGraphExport
