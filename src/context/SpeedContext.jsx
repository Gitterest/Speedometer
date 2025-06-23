import { createContext, useContext } from 'react'
import useSpeed from '../hooks/useSpeed'
import { useUnit } from './UnitContext'

const SpeedContext = createContext(null)

export function SpeedProvider({ children }) {
  const { unit } = useUnit()
  const data = useSpeed(unit)
  return (
    <SpeedContext.Provider value={data}>
      {children}
    </SpeedContext.Provider>
  )
}

export function useSpeedContext() {
  const ctx = useContext(SpeedContext)
  if (!ctx) throw new Error('useSpeedContext must be used within SpeedProvider')
  return ctx
}
