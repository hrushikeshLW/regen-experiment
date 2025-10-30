import { Menu } from 'antd'
import {
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
  WhatsappIcon,
  EmailIcon,
  TelegramIcon
} from 'react-share'
import { SHARE_PLATFORMS } from '../../../common/constants/exportConstants'

const ShareSubMenu = ({ onShare, disabled }) => {
  const handleShare = (platform, event) => {
    // Prevent default menu close
    event?.stopPropagation()

    // Call the onShare callback with platform
    onShare?.(platform)
  }

  const menuItems = [
    {
      key: SHARE_PLATFORMS.WHATSAPP,
      label: (
        <div className="share-menu-item whatsapp-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          <WhatsappIcon size={24} round />
          <span className="share-label">WhatsApp</span>
        </div>
      ),
      onClick: (e) => handleShare(SHARE_PLATFORMS.WHATSAPP, e),
      disabled,
    },
    {
      key: SHARE_PLATFORMS.EMAIL,
      label: (
        <div className="share-menu-item email-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          <EmailIcon size={24} round />
          <span className="share-label">Email</span>
        </div>
      ),
      onClick: (e) => handleShare(SHARE_PLATFORMS.EMAIL, e),
      disabled,
    },
    {
      key: SHARE_PLATFORMS.TELEGRAM,
      label: (
        <div className="share-menu-item telegram-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          <TelegramIcon size={24} round />
          <span className="share-label">Telegram</span>
        </div>
      ),
      onClick: (e) => handleShare(SHARE_PLATFORMS.TELEGRAM, e),
      disabled,
    },
  ]

  return (
    <Menu
      items={menuItems}
      className="modern-share-menu"
    />
  )
}

export default ShareSubMenu
