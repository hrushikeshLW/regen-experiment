import PropTypes from 'prop-types'
import { WIDGET_TYPES, EXPORT_FORMATS, SHARE_PLATFORMS } from '../../constants/exportConstants'

// Widget PropTypes
export const widgetPropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(WIDGET_TYPES)).isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

// Table column PropTypes
export const tableColumnPropTypes = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataIndex: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  align: PropTypes.oneOf(['left', 'center', 'right']),
}

// Export options PropTypes
export const exportOptionsPropTypes = {
  format: PropTypes.oneOf(Object.values(EXPORT_FORMATS)).isRequired,
  onExport: PropTypes.func.isRequired,
}

// Share options PropTypes
export const shareOptionsPropTypes = {
  platform: PropTypes.oneOf(Object.values(SHARE_PLATFORMS)).isRequired,
  onShare: PropTypes.func.isRequired,
}

// Graph data PropTypes
export const graphDataPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
  })
)
