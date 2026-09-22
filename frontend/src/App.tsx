import { useEffect, useState } from 'react'
import './css/App.css'

type ApiStatus = {
  status: string
  message: string
  timestamp: string
}

function App() {
  const [data, setData] = useState<ApiStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/health')

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const result = (await response.json()) as ApiStatus
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to connect to the API.')
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [])

  return (
    <main className="app-shell">
      <section className="status-card">
        <p className="eyebrow">NIUNORM</p>
        <h1>Laravel + React setup</h1>

        {loading && <p className="state">Connecting to backend...</p>}

        {error && <p className="state error">{error}</p>}

        {data && (
          <div className="status-panel">
            <span className={`badge ${data.status === 'ok' ? 'ok' : 'warn'}`}>
              {data.status}
            </span>
            <h2>{data.message}</h2>
            <p>{new Date(data.timestamp).toLocaleString()}</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
