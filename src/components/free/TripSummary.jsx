import useSpeed from '../../hooks/useSpeed'
import { useUnit } from '../../context/UnitContext'

export default function TripSummary() {
  const { unit } = useUnit()
  const { distance, duration, avgSpeed } = useSpeed(unit)
  return (
    <div className="p-4 space-y-1 text-sm">
      <div>Distance: {(unit === 'kmh' ? distance/1000 : distance/1609.34).toFixed(2)} {unit === 'kmh' ? 'km' : 'mi'}</div>
      <div>Duration: {Math.floor(duration)} s</div>
      <div>Avg speed: {avgSpeed.toFixed(1)} {unit === 'kmh' ? 'km/h' : 'mph'}</div>
    </div>
  )
}
