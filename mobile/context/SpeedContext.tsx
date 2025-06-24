import React, { createContext, useContext, useState } from 'react'
import useSpeed from '../hooks/useSpeed'
import { useUnit } from './UnitContext'

export interface SpeedData {
  speed: number
  maxSpeed: number
  distance: number
  duration: number
  avgSpeed: number
  error: string | null
  setSpeed?: (v: number | null) => void
}

const SpeedContext = createContext<SpeedData | undefined>(undefined)

export const SpeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { unit } = useUnit()
  const data = useSpeed(unit)
  const [override, setOverride] = useState<number | null>(null)
  const value = {
    ...data,
    speed: override !== null ? override : data.speed,
    setSpeed: setOverride,
  }
  return <SpeedContext.Provider value={value}>{children}</SpeedContext.Provider>
}

export const useSpeedContext = () => {
  const ctx = useContext(SpeedContext)
  if (!ctx) throw new Error('useSpeedContext must be used within SpeedProvider')
  return ctx
}
