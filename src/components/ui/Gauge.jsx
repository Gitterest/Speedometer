import { motion, useMotionValue, animate } from 'framer-motion'
import { useEffect } from 'react'
import { speedToAngle } from '../../common/speedToAngle'

export default function Gauge({ value = 0, max = 180 }) {
  const angle = useMotionValue(-90)

  useEffect(() => {
    const target = speedToAngle(value, max, -90, 90)
    const controls = animate(angle, target, { duration: 0.5, ease: 'easeInOut' })
    return controls.stop
  }, [value, max, angle])

  return (
    <div className="glass rounded-lg p-4">
      <svg viewBox="0 0 100 50" className="w-full max-w-xs mx-auto">
        <path d="M5 45 A45 45 0 0 1 95 45" fill="none" stroke="#555" strokeWidth="4" />
        <motion.g style={{ originX: '50%', originY: '45%', rotate: angle }}>
          <line x1="50" y1="45" x2="50" y2="15" stroke="currentColor" strokeWidth="4" />
        </motion.g>
      </svg>
    </div>
  )
}
