import { Table } from 'antd'
import Widget from './Widget'
import useTableExport from '../../../common/hooks/useTableExport'
import { WIDGET_TYPES, EXPORT_FORMATS } from '../../../common/constants/exportConstants'

const TableWidget = ({ id, title, data, columns }) => {
  const { exportAsCSV, exportAsPDF, shareTable, isExporting } = useTableExport(
    data,
    columns,
    title
  )

  const handleDownload = async (format) => {
    if (format === EXPORT_FORMATS.CSV) {
      await exportAsCSV()
    } else if (format === EXPORT_FORMATS.PDF) {
      await exportAsPDF()
    }
  }

  const handleShare = async (platform) => {
    await shareTable(platform)
  }

  return (
    <Widget
      id={id}
      title={title}
      type={WIDGET_TYPES.TABLE}
      onDownload={handleDownload}
      onShare={handleShare}
      isExporting={isExporting}
    >
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showTotal: (total) => `Total ${total} items`,
        }}
        size="small"
        bordered
        scroll={{ x: 'max-content' }}
      />
    </Widget>
  )
}

export default TableWidget
