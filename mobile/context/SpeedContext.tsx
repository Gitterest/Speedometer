import React, { createContext, useContext } from 'react'
import useSpeed from '../hooks/useSpeed'
import { useUnit } from './UnitContext'

export interface SpeedData {
  speed: number
  distance: number
  duration: number
  avgSpeed: number
  error: string | null
}

const SpeedContext = createContext<SpeedData | undefined>(undefined)

export const SpeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { unit } = useUnit()
  const data = useSpeed(unit)
  return <SpeedContext.Provider value={data}>{children}</SpeedContext.Provider>
}

export const useSpeedContext = () => {
  const ctx = useContext(SpeedContext)
  if (!ctx) throw new Error('useSpeedContext must be used within SpeedProvider')
  return ctx
}
