import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useSpeed from '../hooks/useSpeed'
import { useUnit } from './UnitContext'

export interface SpeedData {
  speed: number
  maxSpeed: number
  distance: number
  duration: number
  avgSpeed: number
  error: string | null
  clearTrip: () => void
  setSpeed?: (v: number | null) => void
}

const SpeedContext = createContext<SpeedData | undefined>(undefined)

export const SpeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { unit } = useUnit()
  const data = useSpeed(unit)
  const [override, setOverride] = useState<number | null>(null)
  const [baseDistance, setBaseDistance] = useState(0)
  const [baseDuration, setBaseDuration] = useState(0)
  const [maxSpeed, setMaxSpeed] = useState(0)

  useEffect(() => {
    ;(async () => {
      const raw = await AsyncStorage.getItem('tripData')
      if (raw) {
        try {
          const { distance = 0, duration = 0, maxSpeed = 0 } = JSON.parse(raw)
          setBaseDistance(distance)
          setBaseDuration(duration)
          setMaxSpeed(maxSpeed)
        } catch (e) {
          // ignore
        }
      }
    })()
  }, [])

  useEffect(() => {
    setMaxSpeed(ms => Math.max(ms, data.speed))
  }, [data.speed])

  useEffect(() => {
    return () => {
      AsyncStorage.setItem(
        'tripData',
        JSON.stringify({
          distance: baseDistance + data.distance,
          duration: baseDuration + data.duration,
          maxSpeed,
        })
      )
    }
  }, [baseDistance, baseDuration, data.distance, data.duration, maxSpeed])

  const clearTrip = async () => {
    await AsyncStorage.removeItem('tripData')
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
    setSpeed: setOverride,
  }
  return <SpeedContext.Provider value={value}>{children}</SpeedContext.Provider>
}

export const useSpeedContext = () => {
  const ctx = useContext(SpeedContext)
  if (!ctx) throw new Error('useSpeedContext must be used within SpeedProvider')
  return ctx
}
