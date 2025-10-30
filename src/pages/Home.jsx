import { useNavigate } from 'react-router'
import { Button } from 'antd'
import { DashboardOutlined } from '@ant-design/icons'

const Home = () => {
  const navigate = useNavigate()

  const handleGoToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        background: 'white',
        padding: '60px 80px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <DashboardOutlined style={{ fontSize: '80px', color: '#1890ff', marginBottom: '24px' }} />
        <h1 style={{
          fontSize: '36px',
          marginBottom: '16px',
          color: '#333',
          fontWeight: '600'
        }}>
          Welcome to Dashboard
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          View and manage your widgets with powerful export and share capabilities.
          Export tables as CSV or PDF, graphs as images, and share directly to WhatsApp, Email, or Telegram.
        </p>
        <Button
          type="primary"
          size="large"
          onClick={handleGoToDashboard}
          icon={<DashboardOutlined />}
          style={{
            height: '48px',
            fontSize: '16px',
            padding: '0 40px',
            borderRadius: '6px'
          }}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}

export default Home
