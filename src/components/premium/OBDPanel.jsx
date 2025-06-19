export default function OBDPanel() {
  const mock = { fuel: 75, temp: 90, speed: 60 }
  return (
    <div className="p-2 text-sm space-y-1">
      <div>Fuel: {mock.fuel}%</div>
      <div>Temp: {mock.temp}&deg;C</div>
      <div>Speed: {mock.speed} km/h</div>
    </div>
  )
}
