import {
  isWebShareSupported,
  canShareFile,
  prepareShareData,
  createFileFromBlob,
  getMimeType,
} from './shareHelpers'
import { SHARE_PLATFORMS } from '../../constants/exportConstants'

/**
 * Share widget - Download file first, then use react-share URLs
 * Note: react-share handles the platform-specific URL generation
 */
export const shareWidget = async (fileBlob, platform, widgetTitle, filename) => {
  try {
    if (!fileBlob) {
      throw new Error('No file to share')
    }

    // Determine file extension and MIME type
    const fileExtension = filename?.split('.')?.pop()?.toLowerCase() || 'pdf'
    const mimeType = getMimeType(fileExtension)

    // Create File object from Blob
    const file = createFileFromBlob(fileBlob, filename, mimeType)

    if (!file) {
      throw new Error('Failed to create file for sharing')
    }

    // Try Web Share API first if supported (works on mobile)
    if (isWebShareSupported() && canShareFile(file)) {
      const shareData = prepareShareData(file, widgetTitle, `Check out this ${widgetTitle}`)

      await navigator.share(shareData)

      return {
        success: true,
        platform,
        method: 'web-share-api',
      }
    }

    // Fallback: Download file and let react-share handle the platform URLs
    return await fallbackShare(file, platform, widgetTitle)
  } catch (error) {
    // User cancelled share - not an error
    if (error?.name === 'AbortError') {
      return {
        success: false,
        cancelled: true,
        platform,
      }
    }

    console.error('Share error:', error)
    throw error
  }
}

/**
 * Fallback sharing method when Web Share API is not available
 */
const fallbackShare = async (file, platform, title) => {
  try {
    // Create object URL for the file
    const fileUrl = URL.createObjectURL(file)

    // Trigger download first
    await downloadFile(file, fileUrl)

    // Handle platform-specific sharing
    if (platform === SHARE_PLATFORMS.EMAIL) {
      const subject = encodeURIComponent(title)
      const body = encodeURIComponent(
        `Hi,\n\nI'm sharing "${title}" with you.\n\n` +
        `The file has been downloaded to your device. Please attach it to this email.\n\n` +
        `Best regards`
      )

      // Open email client
      window.open(`mailto:?subject=${subject}&body=${body}`, '_blank')

      // Clean up object URL after a delay
      setTimeout(() => URL.revokeObjectURL(fileUrl), 10000)

      return {
        success: true,
        platform,
        method: 'mailto-with-download',
      }
    }

    if (platform === SHARE_PLATFORMS.WHATSAPP) {
      // Create share message
      const text = encodeURIComponent(`Check out this ${title}!`)

      // Detect mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator?.userAgent || ''
      )

      // Use appropriate WhatsApp URL
      const whatsappUrl = isMobile
        ? `whatsapp://send?text=${text}`
        : `https://web.whatsapp.com/send?text=${text}`

      // Open WhatsApp
      window.open(whatsappUrl, '_blank')

      // Clean up object URL after a delay
      setTimeout(() => URL.revokeObjectURL(fileUrl), 10000)

      return {
        success: true,
        platform,
        method: 'whatsapp-redirect',
      }
    }

    if (platform === SHARE_PLATFORMS.TELEGRAM) {
      // Create share message
      const text = encodeURIComponent(`Check out this ${title}!`)

      // Open Telegram share URL
      const telegramUrl = `https://t.me/share/url?text=${text}`
      window.open(telegramUrl, '_blank')

      // Clean up object URL after a delay
      setTimeout(() => URL.revokeObjectURL(fileUrl), 10000)

      return {
        success: true,
        platform,
        method: 'telegram-redirect',
      }
    }

    // For unknown platforms, just download
    setTimeout(() => URL.revokeObjectURL(fileUrl), 1000)

    return {
      success: true,
      platform,
      method: 'download-fallback',
    }
  } catch (error) {
    console.error('Fallback share error:', error)
    throw error
  }
}

/**
 * Download file to user's device
 */
const downloadFile = (file, fileUrl) => {
  return new Promise((resolve) => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Give some time for download to start
    setTimeout(resolve, 500)
  })
}

