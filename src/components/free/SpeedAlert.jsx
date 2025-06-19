import { useState } from 'react'
import useSpeed from '../../hooks/useSpeed'

export default function SpeedAlert() {
  const { speed } = useSpeed()
  const [limit, setLimit] = useState(80)
  const over = speed > limit
  return (
    <div className="p-4">
      <label className="block text-sm">Speed limit (km/h)</label>
      <input type="number" value={limit} onChange={e => setLimit(Number(e.target.value))}
        className="border p-1 w-full" />
      {over && <div className="text-red-600 mt-2 font-bold">Slow down!</div>}
    </div>
  )
}
