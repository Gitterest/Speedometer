export default function SmartwatchModule() {
  const mock = { heart: 80, steps: 1200 }
  return (
    <div className="p-2 text-sm">
      <div>Heart Rate: {mock.heart} bpm</div>
      <div>Steps: {mock.steps}</div>
    </div>
  )
}
