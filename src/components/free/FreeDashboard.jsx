import HUD from './HUD'
import SpeedAlert from './SpeedAlert'
import TripSummary from './TripSummary'
import AdBanner from './AdBanner'
import UnitToggle from './UnitToggle'
import ThemeToggle from '../ui/ThemeToggle'

export default function FreeDashboard() {
  return (
    <div className="max-w-sm mx-auto p-2">
      <div className="flex justify-between items-center space-x-2">
        <h1 className="text-xl font-bold">Free Speedometer</h1>
        <UnitToggle />
        <ThemeToggle />
      </div>
      <HUD />
      <SpeedAlert />
      <TripSummary />
      <AdBanner />
    </div>
  )
}
