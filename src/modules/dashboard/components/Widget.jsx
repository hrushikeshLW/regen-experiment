import { useState } from 'react'
import { Card, Spin } from 'antd'
import WidgetOptionsMenu from './WidgetOptionsMenu'
import ShareModal from './ShareModal'

const Widget = ({
  title,
  type,
  children,
  onDownload,
  isExporting = false,
  style = {},
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)

  const handleShareClick = () => {
    setShareModalOpen(true)
  }

  const handleShareModalClose = () => {
    setShareModalOpen(false)
  }

  // Generate share URL - use current page URL
  const shareUrl = window.location.href

  return (
    <>
      <Card
        title={title}
        extra={
          <div className="widget-options-container">
            <WidgetOptionsMenu
              widgetType={type}
              onDownload={onDownload}
              onShare={handleShareClick}
              disabled={isExporting}
              visible={isHovered || isExporting}
            />
          </div>
        }
        style={{
          height: '100%',
          borderRadius: '8px',
          boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s ease',
          ...style,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="dashboard-widget"
      >
        <Spin spinning={isExporting} tip="Exporting...">
          <div style={{ minHeight: '300px' }}>
            {children}
          </div>
        </Spin>
      </Card>

      <ShareModal
        open={shareModalOpen}
        onCancel={handleShareModalClose}
        shareUrl={shareUrl}
        title={title}
      />
    </>
  )
}

export default Widget
