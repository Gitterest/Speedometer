import { useState } from 'react'
import useSpeed from '../../hooks/useSpeed'
import { useUnit } from '../../context/UnitContext'

export default function SpeedAlert() {
  const { unit } = useUnit()
  const { speed } = useSpeed(unit)
  const [limit, setLimit] = useState(unit === 'kmh' ? 80 : 50)
  const over = speed > limit
  return (
    <div className="p-4">
      <label className="block text-sm">Speed limit ({unit === 'kmh' ? 'km/h' : 'mph'})</label>
      <input type="number" value={limit} onChange={e => setLimit(Number(e.target.value))}
        className="border p-1 w-full" />
      {over && <div className="text-red-600 mt-2 font-bold">Slow down!</div>}
    </div>
  )
}
