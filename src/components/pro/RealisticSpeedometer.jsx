import { motion, useMotionValue, animate, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useUnit } from '../../context/UnitContext'
import { useSpeedContext } from '../../context/SpeedContext'
import { speedToAngle } from '../../common/speedToAngle'

export default function RealisticSpeedometer({ className = '', max = 240 }) {
  const { unit } = useUnit()
  const { speed } = useSpeedContext()
  const unitLabel = unit === 'kmh' ? 'km/h' : 'mph'

  const value = useMotionValue(0)
  const angle = useMotionValue(-120)
  const [display, setDisplay] = useState(0)
  useMotionValueEvent(value, 'change', v => setDisplay(v))

  useEffect(() => {
    const controls = animate(value, speed, { duration: 0.3 })
    return controls.stop
  }, [speed, value])

  useEffect(() => {
    const target = speedToAngle(speed, max, -120, 120)
    const controls = animate(angle, target, { duration: 0.3 })
    return controls.stop
  }, [speed, max, angle])

  const ticks = Array.from({ length: 13 }, (_, i) => i)

  const needleColor =
    speed > 0.9 * max ? '#dc2626' : speed > 0.7 * max ? '#facc15' : '#e11d48'
  const blur = speed > 0.8 * max ? 'blur(0.5px)' : 'none'

  return (
    <div className={`relative mx-auto ${className}`} role="img" aria-label="Speedometer">
      <svg viewBox="0 0 200 100" className="w-full max-w-md">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#444" />
            <stop offset="100%" stopColor="#111" />
          </linearGradient>
        </defs>
        <path d="M20 90 A80 80 0 0 1 180 90" fill="none" stroke="url(#grad)" strokeWidth="12" />
        {ticks.map(i => {
          const a = (-120 + (i / 12) * 240) * Math.PI / 180
          const x1 = 100 + 70 * Math.cos(a)
          const y1 = 90 + 70 * Math.sin(a)
          const x2 = 100 + 80 * Math.cos(a)
          const y2 = 90 + 80 * Math.sin(a)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth={i % 3 === 0 ? 3 : 1} />
        })}
        <motion.g style={{ originX: '50%', originY: '90%', rotate: angle }}>
          <motion.line
            x1="100"
            y1="90"
            x2="100"
            y2="30"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ stroke: needleColor }}
            style={{ filter: blur }}
          />
        </motion.g>
      </svg>
      <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none">
        <motion.div className="font-digital text-6xl text-neon-green" aria-label="Current speed">
          {display.toFixed(1)} {unitLabel}
        </motion.div>
      </div>
    </div>
  )
}
