export default function VoiceGestureControl() {
  const startListening = () => console.log('Listening...')
  return (
    <div className="p-2">
      <button onClick={startListening} className="border px-2 py-1">Voice/Gesture</button>
    </div>
  )
}
