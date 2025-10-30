import { Typography, Button, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import DashboardGrid, { GridItem } from './DashboardGrid'
import TableWidget from './TableWidget'
import GraphWidget from './GraphWidget'
import '../styles/dashboard.css'

const { Title, Text } = Typography

// Sample data for Table Widget
const tableData = [
  {
    key: '1',
    id: 'EMP001',
    name: 'John Doe',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: '$95,000',
    experience: '8 years',
    status: 'Active',
  },
  {
    key: '2',
    id: 'EMP002',
    name: 'Jane Smith',
    department: 'Marketing',
    position: 'Marketing Manager',
    salary: '$85,000',
    experience: '6 years',
    status: 'Active',
  },
  {
    key: '3',
    id: 'EMP003',
    name: 'Bob Johnson',
    department: 'Sales',
    position: 'Sales Executive',
    salary: '$70,000',
    experience: '4 years',
    status: 'Active',
  },
  {
    key: '4',
    id: 'EMP004',
    name: 'Alice Williams',
    department: 'Engineering',
    position: 'Tech Lead',
    salary: '$110,000',
    experience: '10 years',
    status: 'Active',
  },
  {
    key: '5',
    id: 'EMP005',
    name: 'Charlie Brown',
    department: 'HR',
    position: 'HR Specialist',
    salary: '$65,000',
    experience: '5 years',
    status: 'Active',
  },
  {
    key: '6',
    id: 'EMP006',
    name: 'Diana Prince',
    department: 'Finance',
    position: 'Financial Analyst',
    salary: '$80,000',
    experience: '7 years',
    status: 'Active',
  },
  {
    key: '7',
    id: 'EMP007',
    name: 'Ethan Hunt',
    department: 'Operations',
    position: 'Operations Manager',
    salary: '$90,000',
    experience: '9 years',
    status: 'Active',
  },
  {
    key: '8',
    id: 'EMP008',
    name: 'Fiona Green',
    department: 'Engineering',
    position: 'Junior Developer',
    salary: '$55,000',
    experience: '2 years',
    status: 'Active',
  },
]

const tableColumns = [
  {
    title: 'Employee ID',
    dataIndex: 'id',
    key: 'id',
    width: 120,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    width: 130,
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    width: 160,
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    key: 'salary',
    width: 110,
    align: 'right',
  },
  {
    title: 'Experience',
    dataIndex: 'experience',
    key: 'experience',
    width: 120,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 100,
  },
]

// Sample data for Graph Widget
const graphData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 5100 },
  { name: 'Mar', value: 4800 },
  { name: 'Apr', value: 6200 },
  { name: 'May', value: 5800 },
  { name: 'Jun', value: 7100 },
  { name: 'Jul', value: 6800 },
  { name: 'Aug', value: 7500 },
  { name: 'Sep', value: 6900 },
  { name: 'Oct', value: 8200 },
]

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="dashboard-fullscreen">
      {/* Header */}
      <div className="dashboard-header">
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Space>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Space>
          <Title level={2} style={{ margin: 0 }}>
            Dashboard
          </Title>
          <Text type="secondary">
            View and export your widgets. Hover over widgets to see export and share options.
          </Text>
        </Space>
      </div>

      {/* Dashboard Grid */}
      <DashboardGrid>
        <GridItem span={12}>
          <TableWidget
            id="employee-table"
            title="Employee Data"
            data={tableData}
            columns={tableColumns}
          />
        </GridItem>
        <GridItem span={12}>
          <GraphWidget
            id="monthly-sales"
            title="Monthly Sales Performance"
            data={graphData}
          />
        </GridItem>
      </DashboardGrid>
    </div>
  )
}

export default Dashboard
