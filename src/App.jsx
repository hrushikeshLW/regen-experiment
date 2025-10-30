import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Dashboard from './modules/dashboard/components/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
