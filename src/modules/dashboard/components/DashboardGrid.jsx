import { Row, Col } from 'antd'

const DashboardGrid = ({ children }) => {
  return (
    <Row gutter={[24, 24]} className="dashboard-grid">
      {children}
    </Row>
  )
}

export const GridItem = ({ children, span = 12 }) => {
  return (
    <Col xs={24} sm={24} md={24} lg={span} xl={span}>
      {children}
    </Col>
  )
}

export default DashboardGrid
