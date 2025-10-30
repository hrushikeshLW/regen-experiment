import { useState } from 'react'
import { message } from 'antd'
import { shareWidget } from '../utils/share/shareHandler'
import { MESSAGES } from '../constants/exportConstants'

/**
 * Custom hook for sharing widget exports
 */
const useShare = () => {
  const [isSharing, setIsSharing] = useState(false)

  const share = async (fileBlob, platform, widgetTitle, filename) => {
    setIsSharing(true)

    try {
      const result = await shareWidget(fileBlob, platform, widgetTitle, filename)

      if (result?.cancelled) {
        // User cancelled, don't show error
        return { success: false, cancelled: true }
      }

      message.success(MESSAGES.SHARE_SUCCESS)

      return { success: true, result }
    } catch (error) {
      console.error('Share error:', error)
      message.error(MESSAGES.SHARE_ERROR)

      return { success: false, error }
    } finally {
      setIsSharing(false)
    }
  }

  return {
    share,
    isSharing,
  }
}

export default useShare
