import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FreeDashboard from './components/free/FreeDashboard'
import PremiumDashboard from './components/premium/PremiumDashboard'
import { ThemeProvider } from './context/ThemeContext'
import { isPremium } from './utils/featureFlags'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={isPremium ? '/premium' : '/free'} />} />
          <Route path="/free" element={<FreeDashboard />} />
          <Route path="/premium" element={isPremium ? <PremiumDashboard /> : <Navigate to="/free" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
