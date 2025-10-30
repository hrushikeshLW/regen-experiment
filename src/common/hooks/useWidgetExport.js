import { WIDGET_TYPES } from '../constants/exportConstants'
import useTableExport from './useTableExport'
import useGraphExport from './useGraphExport'

/**
 * Abstraction hook that delegates to appropriate export hook based on widget type
 */
const useWidgetExport = (widgetType, data, columns, widgetTitle, graphRef) => {
  const tableExport = useTableExport(data, columns, widgetTitle)
  const graphExport = useGraphExport(graphRef, widgetTitle)

  if (widgetType === WIDGET_TYPES.TABLE) {
    return {
      ...tableExport,
      widgetType: WIDGET_TYPES.TABLE,
    }
  }

  if (widgetType === WIDGET_TYPES.GRAPH) {
    return {
      ...graphExport,
      widgetType: WIDGET_TYPES.GRAPH,
    }
  }

  // Default fallback
  return {
    isExporting: false,
    widgetType: null,
  }
}

export default useWidgetExport
