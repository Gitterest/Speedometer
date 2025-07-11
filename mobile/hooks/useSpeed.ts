import { useEffect, useState, useRef } from 'react'
import * as Location from 'expo-location'
import { haversineDistance } from '../utils/geo'
import convertSpeed from '../utils/convertSpeed'
import { Unit } from '../context/UnitContext'

export default function useSpeed(unit: Unit) {
  const [speedMs, setSpeedMs] = useState(0)
  const [maxSpeedMs, setMaxSpeedMs] = useState(0)
  const [distance, setDistance] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const startTime = useRef(Date.now())
  const lastPos = useRef<Location.LocationObjectCoords | null>(null)

  useEffect(() => {
    let watch: Location.LocationSubscription
    ;(async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (!granted) {
        setError('Location permission denied')
        return
      }
      watch = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 1 },
        pos => {
          const { speed, latitude, longitude } = pos.coords
          setSpeedMs(speed ?? 0)
          setMaxSpeedMs(prev => Math.max(prev, speed ?? 0))
          if (lastPos.current) {
            const d = haversineDistance(
              lastPos.current.latitude,
              lastPos.current.longitude,
              latitude,
              longitude
            )
            setDistance(prev => prev + d)
          }
          lastPos.current = pos.coords
        }
      )
    })()
    return () => {
      watch && watch.remove()
    }
  }, [])

  const duration = (Date.now() - startTime.current) / 1000
  const avgSpeedMs = distance && duration ? distance / duration : 0
  return {
    speed: convertSpeed(speedMs, unit),
    maxSpeed: convertSpeed(maxSpeedMs, unit),
    distance,
    duration,
    avgSpeed: convertSpeed(avgSpeedMs, unit),
    error,
  }
}
