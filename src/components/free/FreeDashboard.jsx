import SpeedHUD from '../ui/SpeedHUD'
import Gauge from '../ui/Gauge'
import SpeedAlert from './SpeedAlert'
import TripSummary from './TripSummary'
import AdBanner from './AdBanner'
import UnitToggle from './UnitToggle'
import TripInfo from '../ui/TripInfo'
import AROverlay from '../ui/AROverlay'
import ThemeToggle from '../ui/ThemeToggle'
import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'
import { sweep } from '../../hooks/useAnimations'
import { useUnit } from '../../context/UnitContext'
import useSpeed from '../../hooks/useSpeed'

export default function FreeDashboard() {
  const { unit } = useUnit()
  const { speed } = useSpeed(unit)
  const { dark, setDark } = useTheme()

  return (
    <motion.div
      className="max-w-sm mx-auto p-2"
      variants={sweep}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-sm mx-auto p-2 relative space-y-4">
        <div className="flex justify-between items-center space-x-2">
          <h1 className="text-xl font-bold">Free Speedometer</h1>
          <UnitToggle />
          <ThemeToggle />
        </div>
        <SpeedHUD />
        <Gauge value={speed} />
        <SpeedAlert />
        <TripSummary />
        <TripInfo />
        <AdBanner />
        <AROverlay />
      </div>
    </motion.div>
  )
}
