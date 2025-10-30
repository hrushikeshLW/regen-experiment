import { Menu } from 'antd'
import { DownloadOutlined, FileTextOutlined, FilePdfOutlined, FileImageOutlined } from '@ant-design/icons'
import { WIDGET_TYPES, EXPORT_FORMATS } from '../../../common/constants/exportConstants'

const DownloadSubMenu = ({ widgetType, onDownload, disabled }) => {
  const getMenuItems = () => {
    if (widgetType === WIDGET_TYPES.TABLE) {
      return [
        {
          key: EXPORT_FORMATS.CSV,
          icon: <FileTextOutlined />,
          label: 'CSV',
          onClick: () => onDownload?.(EXPORT_FORMATS.CSV),
        },
        {
          key: EXPORT_FORMATS.PDF,
          icon: <FilePdfOutlined />,
          label: 'PDF',
          onClick: () => onDownload?.(EXPORT_FORMATS.PDF),
        },
      ]
    }

    if (widgetType === WIDGET_TYPES.GRAPH) {
      return [
        {
          key: EXPORT_FORMATS.PDF,
          icon: <FilePdfOutlined />,
          label: 'PDF',
          onClick: () => onDownload?.(EXPORT_FORMATS.PDF),
        },
        {
          key: EXPORT_FORMATS.PNG,
          icon: <FileImageOutlined />,
          label: 'PNG',
          onClick: () => onDownload?.(EXPORT_FORMATS.PNG),
        },
        {
          key: EXPORT_FORMATS.JPG,
          icon: <FileImageOutlined />,
          label: 'JPG',
          onClick: () => onDownload?.(EXPORT_FORMATS.JPG),
        },
      ]
    }

    return []
  }

  return (
    <Menu
      items={getMenuItems()}
      disabled={disabled}
      style={{ minWidth: 120 }}
    />
  )
}

export default DownloadSubMenu
