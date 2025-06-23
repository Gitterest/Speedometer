import SpeedHUD from '../ui/SpeedHUD'
import Gauge from '../ui/Gauge'
import SpeedAlert from './SpeedAlert'
import TripSummary from './TripSummary'
import AdBanner from './AdBanner'
import UnitToggle from './UnitToggle'
import TripInfo from '../ui/TripInfo'
import AROverlay from '../ui/AROverlay'
import ThemeToggle from '../ui/ThemeToggle'
import { motion } from 'framer-motion'
import { sweep } from '../../hooks/useAnimations'
import { SpeedProvider, useSpeedContext } from '../../context/SpeedContext'

function DashboardContent() {
  const { speed } = useSpeedContext()

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

export default function FreeDashboard() {
  return (
    <SpeedProvider>
      <DashboardContent />
    </SpeedProvider>
  )
}
