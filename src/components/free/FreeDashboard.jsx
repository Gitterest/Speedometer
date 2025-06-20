import SpeedHUD from '../ui/SpeedHUD'
import Gauge from '../ui/Gauge'
import SpeedAlert from './SpeedAlert'
import TripSummary from './TripSummary'
import AdBanner from './AdBanner'
import UnitToggle from './UnitToggle'
import TripInfo from '../ui/TripInfo'
import AROverlay from '../ui/AROverlay'
import { useTheme } from '../../context/ThemeContext'
import { useUnit } from '../../context/UnitContext'
import useSpeed from '../../hooks/useSpeed'

export default function FreeDashboard() {
  const { unit } = useUnit()
  const { speed } = useSpeed(unit)
  const { dark, setDark } = useTheme()

import ThemeToggle from '../ui/ThemeToggle'

export default function FreeDashboard() {

  return (

    <div className="max-w-sm mx-auto p-2 relative">
    <div className="max-w-sm mx-auto p-2 space-y-4">

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
  )
}
