import useSpeed from '../../hooks/useSpeed'

export default function HUD() {
  const { speed } = useSpeed()
  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-6xl font-bold" data-testid="speed-display">{speed.toFixed(1)} km/h</div>
      <div className="w-full h-2 bg-gray-200 mt-2">
        <div className="bg-green-500 h-full" style={{ width: `${Math.min(speed, 180)/180*100}%` }}></div>
      </div>
    </div>
  )
}
