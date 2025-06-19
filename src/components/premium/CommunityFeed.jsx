const alerts = [
  { id: 1, location: 'Main St', hazard: 'Pothole' },
  { id: 2, location: '2nd Ave', hazard: 'Accident' }
]

export default function CommunityFeed() {
  return (
    <div className="p-2">
      <h2 className="font-bold">Community Alerts</h2>
      <ul className="list-disc ml-5 text-sm">
        {alerts.map(a => (
          <li key={a.id}>{a.location}: {a.hazard}</li>
        ))}
      </ul>
    </div>
  )
}
