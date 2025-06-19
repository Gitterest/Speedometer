import { useUnit } from '../../context/UnitContext'

export default function UnitToggle() {
  const { unit, toggleUnit } = useUnit()
  return (
    <button onClick={toggleUnit} className="text-sm border rounded px-2 py-1">
      {unit === 'kmh' ? 'Switch to MPH' : 'Switch to KMH'}
    </button>
  )
}
