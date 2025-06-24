import React from 'react'
import SpeedHUD from '../ui/SpeedHUD'
import Gauge from '../ui/Gauge'
import SpeedAlert from './SpeedAlert'
import TripSummary from './TripSummary'
import AdBanner from './AdBanner'
import UnitToggle from './UnitToggle'
import HUDToggle from './HUDToggle'
import TripInfo from '../ui/TripInfo'
import AROverlay from '../ui/AROverlay'
import ThemeToggle from '../ui/ThemeToggle'
import { motion } from 'framer-motion'
import { sweep } from '../../hooks/useAnimations'
import { SpeedProvider, useSpeedContext } from '../../context/SpeedContext'
import { useHUD } from '../../context/HUDContext'
import { useUnit } from '../../context/UnitContext'

function DashboardContent() {
  const { speed, setSpeed } = useSpeedContext()
  const { hud, toggleHUD } = useHUD()
  const { toggleUnit } = useUnit()

  React.useEffect(() => {
    function handle(e) {
      if (e.key === 'u') toggleUnit()
      if (e.key === 'h') toggleHUD()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [toggleHUD, toggleUnit])

  return (
    <motion.div
      className="max-w-sm mx-auto p-2"
      variants={sweep}
      initial="initial"
      animate="animate"
    >
      {hud ? (
        <div className="h-screen flex items-center justify-center">
          <SpeedHUD />
        </div>
      ) : (
        <div className="max-w-sm mx-auto p-2 relative space-y-4">
          <div className="flex justify-between items-center space-x-2">
            <h1 className="text-xl font-bold">Free Speedometer</h1>
            <UnitToggle />
            <HUDToggle />
            <ThemeToggle />
          </div>
          <SpeedHUD />
          <Gauge value={speed} />
          <div className="p-4">
            <input
              type="range"
              min="0"
              max="200"
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <SpeedAlert />
          <TripSummary />
          <TripInfo />
          <AdBanner />
          <AROverlay />
        </div>
      )}
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
