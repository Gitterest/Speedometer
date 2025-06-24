import { useEffect, useRef, useState } from 'react'
import { haversineDistance } from '../utils/geo'

export default function useSpeed(unit = 'kmh') {
  const [speedMs, setSpeedMs] = useState(0)
  const [maxSpeedMs, setMaxSpeedMs] = useState(0)
  const [distance, setDistance] = useState(0) // meters
  const [error, setError] = useState(null)
  const startTime = useRef(Date.now())
  const lastPos = useRef(null)

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      pos => {
        const { speed, latitude, longitude } = pos.coords
        setSpeedMs(speed || 0)
        setMaxSpeedMs(prev => Math.max(prev, speed || 0))
        if (lastPos.current) {
          const d = haversineDistance(
            lastPos.current.latitude,
            lastPos.current.longitude,
            latitude,
            longitude
          )
          setDistance(prev => prev + d)
        }
        lastPos.current = { latitude, longitude }
      },
      err => setError(err.message)
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  const duration = (Date.now() - startTime.current) / 1000
  const avgSpeedMs = distance && duration ? distance / duration : 0
  const convert = ms => (unit === 'mph' ? ms * 2.23694 : ms * 3.6)

  return {
    speed: convert(speedMs),
    maxSpeed: convert(maxSpeedMs),
    distance,
    duration,
    avgSpeed: convert(avgSpeedMs),
    error
  }
}
