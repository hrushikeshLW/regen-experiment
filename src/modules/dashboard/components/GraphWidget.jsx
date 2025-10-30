import { useRef } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Widget from './Widget'
import useGraphExport from '../../../common/hooks/useGraphExport'
import { WIDGET_TYPES, EXPORT_FORMATS } from '../../../common/constants/exportConstants'

const GraphWidget = ({ id, title, data }) => {
  const graphRef = useRef(null)
  const { exportAsPDF, exportAsImage, shareGraph, isExporting } = useGraphExport(graphRef, title)

  const handleDownload = async (format) => {
    if (format === EXPORT_FORMATS.PDF) {
      await exportAsPDF()
    } else if (format === EXPORT_FORMATS.PNG || format === EXPORT_FORMATS.JPG) {
      await exportAsImage(format)
    }
  }

  const handleShare = async (platform) => {
    await shareGraph(platform)
  }

  return (
    <Widget
      id={id}
      title={title}
      type={WIDGET_TYPES.GRAPH}
      onDownload={handleDownload}
      onShare={handleShare}
      isExporting={isExporting}
    >
      <div ref={graphRef} style={{ width: '100%', height: '350px', padding: '10px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#1890ff" name="Value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Widget>
  )
}

export default GraphWidget
