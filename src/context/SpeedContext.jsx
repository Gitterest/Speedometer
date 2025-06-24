import { createContext, useContext, useState } from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
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
  const [baseDistance, setBaseDistance] = useState(0)
  const [baseDuration, setBaseDuration] = useState(0)
  const [maxSpeed, setMaxSpeed] = useState(0)

  useEffect(() => {
    const raw = localStorage.getItem('tripData')
    if (raw) {
      try {
        const { distance = 0, duration = 0, maxSpeed = 0 } = JSON.parse(raw)
        setBaseDistance(distance)
        setBaseDuration(duration)
        setMaxSpeed(maxSpeed)
      } catch (e) {
        // ignore parse errors
      }
    }
  }, [])

  useEffect(() => {
    setMaxSpeed(ms => Math.max(ms, data.speed))
  }, [data.speed])

  useEffect(() => {
    return () => {
      localStorage.setItem(
        'tripData',
        JSON.stringify({
          distance: baseDistance + data.distance,
          duration: baseDuration + data.duration,
          maxSpeed
        })
      )
    }
  }, [baseDistance, baseDuration, data.distance, data.duration, maxSpeed])

  const clearTrip = () => {
    localStorage.removeItem('tripData')
    setBaseDistance(0)
    setBaseDuration(0)
    setMaxSpeed(0)
  }

  const value = {
    ...data,
    speed: override !== null ? override : data.speed,
    distance: baseDistance + data.distance,
    duration: baseDuration + data.duration,
    maxSpeed,
    clearTrip,
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
