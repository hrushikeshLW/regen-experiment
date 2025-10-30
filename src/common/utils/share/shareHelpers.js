import { SHARE_PLATFORMS } from '../../constants/exportConstants'

/**
 * Check if Web Share API is supported
 */
export const isWebShareSupported = () => {
  return navigator?.share !== undefined && navigator?.canShare !== undefined
}

/**
 * Check if specific file can be shared via Web Share API
 */
export const canShareFile = (file) => {
  if (!isWebShareSupported()) return false

  try {
    const shareData = { files: [file] }
    return navigator.canShare && navigator.canShare(shareData)
  } catch (error) {
    console.error('Error checking share capability:', error)
    return false
  }
}

/**
 * Prepare share data for Web Share API
 */
export const prepareShareData = (file, title, text = '') => {
  const shareData = {
    title: title || 'Widget Export',
    text: text || 'Sharing widget from dashboard',
  }

  if (file) {
    shareData.files = [file]
  }

  return shareData
}

/**
 * Get platform-specific share URL
 */
export const getShareUrlForPlatform = (platform, fileUrl, title = '', text = '') => {
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(text)
  const encodedUrl = encodeURIComponent(fileUrl)

  switch (platform) {
    case SHARE_PLATFORMS.WHATSAPP:
      return `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`

    case SHARE_PLATFORMS.TELEGRAM:
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`

    case SHARE_PLATFORMS.EMAIL:
      return `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`

    default:
      return null
  }
}

/**
 * Handle share errors
 */
export const handleShareError = (error, platform) => {
  console.error(`Share error for ${platform}:`, error)

  // User cancelled share - not an error
  if (error?.name === 'AbortError') {
    return {
      success: false,
      cancelled: true,
      platform,
    }
  }

  return {
    success: false,
    error: error?.message || 'Unknown share error',
    platform,
  }
}

/**
 * Create a File object from Blob
 */
export const createFileFromBlob = (blob, filename, mimeType) => {
  try {
    return new File([blob], filename, { type: mimeType })
  } catch (error) {
    console.error('Error creating File from Blob:', error)
    return null
  }
}

/**
 * Get appropriate MIME type for file format
 */
export const getMimeType = (format) => {
  const mimeTypes = {
    pdf: 'application/pdf',
    csv: 'text/csv',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
  }

  return mimeTypes[format?.toLowerCase()] || 'application/octet-stream'
}
