import { useEffect, useRef } from 'react'
import useSpeed from '../../hooks/useSpeed'

export default function PredictiveAlerts() {
  const { speed } = useSpeed()
  const last = useRef(speed)

  useEffect(() => {
    if (last.current - speed > 20) {
      alert('Rapid slowdown detected!')
    }
    last.current = speed
  }, [speed])

  return null
}
