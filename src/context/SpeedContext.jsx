import { createContext, useContext, useState } from 'react'
import useSpeed from '../hooks/useSpeed'
import { useUnit } from './UnitContext'

const SpeedContext = createContext(null)

export function SpeedProvider({ children }) {
  const { unit } = useUnit()
  const data = useSpeed(unit)
  const [override, setOverride] = useState(null)
  const value = {
    ...data,
    speed: override !== null ? override : data.speed,
    setSpeed: setOverride
  }
  return (
    <SpeedContext.Provider value={value}>
      {children}
    </SpeedContext.Provider>
  )
}

export function useSpeedContext() {
  const ctx = useContext(SpeedContext)
  if (!ctx) throw new Error('useSpeedContext must be used within SpeedProvider')
  return ctx
}
