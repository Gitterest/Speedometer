import { useEffect } from 'react'

export default function CloudSync() {
  useEffect(() => {
    localStorage.setItem('sync', 'true')
  }, [])
  return <div className="p-2 text-sm">Cloud sync enabled (mock)</div>
}
