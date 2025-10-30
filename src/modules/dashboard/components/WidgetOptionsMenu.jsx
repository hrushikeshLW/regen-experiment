import { Dropdown, Button } from 'antd'
import { MoreOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons'

const WidgetOptionsMenu = ({ widgetType, onDownload, onShare, disabled = false, visible = true }) => {
  // Create dropdown menu with submenus
  const dropdownMenu = {
    items: [
      {
        key: 'download',
        icon: <DownloadOutlined />,
        label: 'Download',
        children: widgetType ? getDownloadItems(widgetType, onDownload) : [],
      },
      {
        key: 'share',
        icon: <ShareAltOutlined />,
        label: 'Share',
        onClick: () => onShare?.(),
      },
    ],
  }

  return (
    <Dropdown
      menu={dropdownMenu}
      trigger={['click']}
      placement="bottomRight"
      disabled={disabled}
      overlayClassName="widget-options-dropdown"
    >
      <Button
        type="text"
        icon={<MoreOutlined />}
        className="widget-options-button"
        style={{
          opacity: visible ? 1 : 0,
          visibility: visible ? 'visible' : 'hidden',
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
          border: 'none',
          fontSize: '20px',
          color: '#666',
          padding: '4px 8px',
        }}
      />
    </Dropdown>
  )
}

// Helper function to get download menu items based on widget type
const getDownloadItems = (widgetType, onDownload) => {
  const tableItems = [
    {
      key: 'csv',
      label: 'CSV',
      onClick: () => onDownload?.('csv'),
    },
    {
      key: 'pdf',
      label: 'PDF',
      onClick: () => onDownload?.('pdf'),
    },
  ]

  const graphItems = [
    {
      key: 'pdf',
      label: 'PDF',
      onClick: () => onDownload?.('pdf'),
    },
    {
      key: 'png',
      label: 'PNG',
      onClick: () => onDownload?.('png'),
    },
    {
      key: 'jpg',
      label: 'JPG',
      onClick: () => onDownload?.('jpg'),
    },
  ]

  return widgetType === 'table' ? tableItems : graphItems
}

export default WidgetOptionsMenu
