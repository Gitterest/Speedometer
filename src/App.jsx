import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FreeDashboard from './components/free/FreeDashboard'
import { ThemeProvider } from './context/ThemeContext'
import { UnitProvider } from './context/UnitContext'
import { HUDProvider } from './context/HUDContext'

export default function App() {
  return (
    <ThemeProvider>
      <UnitProvider>
        <HUDProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/free" />} />
              <Route path="/free" element={<FreeDashboard />} />
            </Routes>
          </BrowserRouter>
        </HUDProvider>
      </UnitProvider>
    </ThemeProvider>
  )
}
