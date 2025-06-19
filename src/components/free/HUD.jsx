import useSpeed from '../../hooks/useSpeed'
import { useUnit } from '../../context/UnitContext'

export default function HUD() {
  const { unit } = useUnit()
  const { speed, error } = useSpeed(unit)
  const unitLabel = unit === 'kmh' ? 'km/h' : 'mph'
  return (
    <div className="flex flex-col items-center p-4">
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <div className="text-6xl font-bold" data-testid="speed-display">{speed.toFixed(1)} {unitLabel}</div>
      <div className="w-full h-2 bg-gray-200 mt-2">
        <div className="bg-green-500 h-full" style={{ width: `${Math.min(speed, 180)/180*100}%` }}></div>
      </div>
    </div>
  )
}
