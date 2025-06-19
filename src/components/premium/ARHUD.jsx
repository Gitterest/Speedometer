import useSpeed from '../../hooks/useSpeed'

export default function ARHUD() {
  const { speed } = useSpeed()
  return (
    <div className="relative h-40 bg-black text-green-500 flex items-center justify-center">
      <video className="absolute inset-0 w-full h-full object-cover opacity-50" autoPlay muted></video>
      <div className="relative text-4xl">{speed.toFixed(1)} km/h</div>
    </div>
  )
}
