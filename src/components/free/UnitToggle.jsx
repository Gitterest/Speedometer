import { useUnit } from '../../context/UnitContext'
import { motion } from 'framer-motion'
import { fade } from '../../hooks/useAnimations'

export default function UnitToggle() {
  const { unit, toggleUnit } = useUnit()
  return (
    <motion.button
      onClick={toggleUnit}
      className="text-sm border rounded px-2 py-1"
      variants={fade}
      initial="initial"
      animate="animate"
    >
      {unit === 'kmh' ? 'Switch to MPH' : 'Switch to KMH'}
    </motion.button>
  )
}
