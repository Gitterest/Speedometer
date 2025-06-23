import { useUnit } from '../../context/UnitContext'
import { useSpeedContext } from '../../context/SpeedContext'
import { useState, useEffect } from 'react'

function useAnimatedNumber(value, duration = 400) {
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    let start = display
    let startTime
    let frame
    function step(t) {
      if (!startTime) startTime = t
      const progress = Math.min((t - startTime) / duration, 1)
      setDisplay(start + (value - start) * progress)
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [value, duration])
  return display
}

export default function TripInfo() {
  const { unit } = useUnit()
  const { speed, distance, duration, avgSpeed } = useSpeedContext()
  const dist = unit === 'kmh' ? distance / 1000 : distance / 1609.34
  const speedUnit = unit === 'kmh' ? 'km/h' : 'mph'
  const distUnit = unit === 'kmh' ? 'km' : 'mi'
  const dispSpeed = useAnimatedNumber(speed)
  const dispAvg = useAnimatedNumber(avgSpeed)
  const dispDist = useAnimatedNumber(dist)
  const dispDur = useAnimatedNumber(duration)

  return (
    <div className="bg-black/80 text-green-500 font-mono text-xs p-2 rounded leading-tight space-y-0.5">
      <div>Speed: {dispSpeed.toFixed(1)} {speedUnit}</div>
      <div>Avg: {dispAvg.toFixed(1)} {speedUnit}</div>
      <div>Dist: {dispDist.toFixed(2)} {distUnit}</div>
      <div>Time: {Math.floor(dispDur)} s</div>
    </div>
  )
}
