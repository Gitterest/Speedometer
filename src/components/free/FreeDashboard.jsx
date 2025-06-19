import HUD from './HUD'
import SpeedAlert from './SpeedAlert'
import TripSummary from './TripSummary'
import AdBanner from './AdBanner'
import UnitToggle from './UnitToggle'
import { useTheme } from '../../context/ThemeContext'

export default function FreeDashboard() {
  const { dark, setDark } = useTheme()
  return (
    <div className="max-w-sm mx-auto p-2">
      <div className="flex justify-between items-center space-x-2">
        <h1 className="text-xl font-bold">Free Speedometer</h1>
        <UnitToggle />
        <button onClick={() => setDark(!dark)} className="text-sm border rounded px-2 py-1">
          {dark ? 'Day' : 'Night'}
        </button>
      </div>
      <HUD />
      <SpeedAlert />
      <TripSummary />
      <AdBanner />
    </div>
  )
}
