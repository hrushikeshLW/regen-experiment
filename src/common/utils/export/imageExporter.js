import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'
import { generateFileName } from './exportHelpers'
import { IMAGE_CONFIG } from '../../constants/exportConstants'

/**
 * Export graph element to image format (PNG or JPG)
 */
export const exportGraphToImage = async (graphElement, format, widgetTitle) => {
  try {
    if (!graphElement) {
      throw new Error('Graph element not found')
    }

    // Validate format
    if (!['png', 'jpg', 'jpeg'].includes(format.toLowerCase())) {
      throw new Error('Invalid image format. Use PNG or JPG.')
    }

    // Capture graph as canvas
    const canvas = await html2canvas(graphElement, {
      scale: IMAGE_CONFIG.SCALE,
      backgroundColor: IMAGE_CONFIG.BACKGROUND_COLOR,
      logging: false,
      useCORS: true,
      allowTaint: false,
    })

    // Convert to blob
    const mimeType = format.toLowerCase() === 'png' ? 'image/png' : 'image/jpeg'

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Failed to create image blob'))
          }
        },
        mimeType,
        IMAGE_CONFIG.QUALITY
      )
    })

    // Generate filename and download
    const filename = generateFileName(widgetTitle, format.toLowerCase())
    saveAs(blob, filename)

    return {
      success: true,
      filename,
      format: format.toLowerCase(),
      blob,
    }
  } catch (error) {
    console.error('Image export error:', error)
    throw error
  }
}

/**
 * Export graph as PNG
 */
export const exportGraphToPNG = async (graphElement, widgetTitle) => {
  return exportGraphToImage(graphElement, 'png', widgetTitle)
}

/**
 * Export graph as JPG
 */
export const exportGraphToJPG = async (graphElement, widgetTitle) => {
  return exportGraphToImage(graphElement, 'jpg', widgetTitle)
}
