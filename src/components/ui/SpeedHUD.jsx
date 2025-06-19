import { motion, useMotionValue, useMotionValueEvent, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import useSpeed from '../../hooks/useSpeed'
import { useUnit } from '../../context/UnitContext'

export default function SpeedHUD() {
  const { unit } = useUnit()
  const { speed, error } = useSpeed(unit)
  const unitLabel = unit === 'kmh' ? 'km/h' : 'mph'

  const value = useMotionValue(0)
  const [display, setDisplay] = useState(0)
  useMotionValueEvent(value, 'change', v => setDisplay(v))

  useEffect(() => {
    const controls = animate(value, speed, { duration: 0.5, ease: 'easeInOut' })
    return controls.stop
  }, [speed, value])

  return (
    <div className="flex flex-col items-center p-4 glass rounded-lg">
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <motion.div data-testid="speed-display" className="text-6xl font-mono text-neon-green font-bold">
        {display.toFixed(1)} {unitLabel}
      </motion.div>
    </div>
  )
}
