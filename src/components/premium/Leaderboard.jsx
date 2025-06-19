export default function Leaderboard() {
  const data = [
    { user: 'Alice', score: 100 },
    { user: 'Bob', score: 80 }
  ]
  return (
    <div className="p-2 text-sm">
      <h2 className="font-bold">Leaderboard</h2>
      <ol className="list-decimal ml-5">
        {data.map(d => (
          <li key={d.user}>{d.user}: {d.score}</li>
        ))}
      </ol>
    </div>
  )
}
