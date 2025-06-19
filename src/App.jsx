import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FreeDashboard from './components/free/FreeDashboard'
import { ThemeProvider } from './context/ThemeContext'
import { UnitProvider } from './context/UnitContext'

export default function App() {
  return (
    <ThemeProvider>
      <UnitProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/free" />} />
            <Route path="/free" element={<FreeDashboard />} />
          </Routes>
        </BrowserRouter>
      </UnitProvider>
    </ThemeProvider>
  )
}
