import { useState } from "react"
import RealisticSpeedometer from './RealisticSpeedometer'
import ThreeSpeedometer from './ThreeSpeedometer'
import UnitToggle from '../free/UnitToggle'
import ThemeToggle from '../ui/ThemeToggle'
import TripInfo from '../ui/TripInfo'
import HUDToggle from '../free/HUDToggle'
import FuelGauge from '../ui/FuelGauge'
import Compass from '../ui/Compass'
import { motion } from 'framer-motion'
import { sweep } from '../../hooks/useAnimations'
import { SpeedProvider, useSpeedContext } from '../../context/SpeedContext'
import { useHUD } from '../../context/HUDContext'

function DashboardContent() {
  const { speed, setSpeed } = useSpeedContext()
  const { hud } = useHUD()
  const [bg, setBg] = useState(0)
  const [three, setThree] = useState(false)
  const bgs = ['bg-speedometer-default', 'bg-speedometer-dusk', 'bg-speedometer-night']
  const nextBg = () => setBg((b) => (b + 1) % bgs.length)

  return (
    <motion.div className="max-w-md mx-auto p-2" variants={sweep} initial="initial" animate="animate">
      {hud ? (
        <div className="h-screen flex items-center justify-center">
          {three ? <ThreeSpeedometer /> : <RealisticSpeedometer className={bgs[bg]} />}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold flex-grow">Pro Speedometer</h1>
            <UnitToggle />
            <HUDToggle />
            <ThemeToggle />
          </div>
          {three ? (
            <ThreeSpeedometer />
          ) : (
            <RealisticSpeedometer className={bgs[bg]} />
          )}
          <div className="p-4">
            <input type="range" min="0" max="240" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full" aria-label="Speed" />
          </div>
          <div className="flex space-x-2">
            <button onClick={nextBg} className="border px-2 py-1 text-sm rounded">Background</button>
            <button onClick={() => setThree(t => !t)} className="border px-2 py-1 text-sm rounded">{three ? '2D' : '3D'}</button>
            <FuelGauge />
            <Compass />
          </div>
          <TripInfo />
        </div>
      )}
    </motion.div>
  )
}

export default function ProDashboard() {
  return (
    <SpeedProvider>
      <DashboardContent />
    </SpeedProvider>
  )
}
