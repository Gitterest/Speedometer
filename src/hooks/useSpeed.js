import { useEffect, useState } from 'react'

export default function useSpeed() {
  const [speed, setSpeed] = useState(0)
  const [distance, setDistance] = useState(0)
  const [startTime] = useState(Date.now())
  const [lastPos, setLastPos] = useState(null)

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(pos => {
      const { speed: spd } = pos.coords
      setSpeed(spd ? spd * 3.6 : 0) // convert m/s to km/h

      if (lastPos) {
        const dx = pos.coords.latitude - lastPos.latitude
        const dy = pos.coords.longitude - lastPos.longitude
        setDistance(d => d + Math.sqrt(dx*dx + dy*dy) * 111139)
      }
      setLastPos(pos.coords)
    })
    return () => navigator.geolocation.clearWatch(watchId)
  }, [lastPos])

  const duration = (Date.now() - startTime) / 1000
  const avgSpeed = distance && duration ? (distance/1000) / (duration/3600) : 0

  return { speed, distance, duration, avgSpeed }
}
