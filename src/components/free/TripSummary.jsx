import useSpeed from '../../hooks/useSpeed'

export default function TripSummary() {
  const { distance, duration, avgSpeed } = useSpeed()
  return (
    <div className="p-4 space-y-1 text-sm">
      <div>Distance: {(distance/1000).toFixed(2)} km</div>
      <div>Duration: {Math.floor(duration)} s</div>
      <div>Avg speed: {avgSpeed.toFixed(1)} km/h</div>
    </div>
  )
}
