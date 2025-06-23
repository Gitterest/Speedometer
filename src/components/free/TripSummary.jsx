import { useUnit } from '../../context/UnitContext'
import { useSpeedContext } from '../../context/SpeedContext'
import { motion } from 'framer-motion'
import { sweep } from '../../hooks/useAnimations'

export default function TripSummary() {
  const { unit } = useUnit()
  const { distance, duration, avgSpeed } = useSpeedContext()
  return (
    <motion.div
      className="p-4 space-y-1 text-sm"
      variants={sweep}
      initial="initial"
      animate="animate"
    >
      <div>
        Distance: {(unit === 'kmh' ? distance / 1000 : distance / 1609.34).toFixed(2)}{' '}
        {unit === 'kmh' ? 'km' : 'mi'}
      </div>
      <div>Duration: {Math.floor(duration)} s</div>
      <div>
        Avg speed: {avgSpeed.toFixed(1)} {unit === 'kmh' ? 'km/h' : 'mph'}
      </div>
    </motion.div>
  )
}
