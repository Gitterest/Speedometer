import SpeedHUD from '../ui/SpeedHUD'
import Gauge from '../ui/Gauge'
import SpeedAlert from './SpeedAlert'
import TripSummary from './TripSummary'
import AdBanner from './AdBanner'
import UnitToggle from './UnitToggle'
import { useTheme } from '../../context/ThemeContext'
import { useUnit } from '../../context/UnitContext'
import useSpeed from '../../hooks/useSpeed'

export default function FreeDashboard() {
  const { unit } = useUnit()
  const { speed } = useSpeed(unit)
  const { dark, setDark } = useTheme()
  return (
    <div className="max-w-sm mx-auto p-2 space-y-4">
      <div className="flex justify-between items-center space-x-2">
        <h1 className="text-xl font-bold">Free Speedometer</h1>
        <UnitToggle />
        <button onClick={() => setDark(!dark)} className="text-sm border rounded px-2 py-1">
          {dark ? 'Day' : 'Night'}
        </button>
      </div>
      <SpeedHUD />
      <Gauge value={speed} />
      <SpeedAlert />
      <TripSummary />
      <AdBanner />
    </div>
  )
}
