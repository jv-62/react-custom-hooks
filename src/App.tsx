
import { useEffect, useState, type JSX } from 'react'
import useDebounce from './hooks/useDebounce'

function App(): JSX.Element {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!debouncedQuery) {
      setResults(["No results"])
      setLoading(false)
      return
    }

    setLoading(true)
    const id = setTimeout(() => {
      const sample = [
        'Apple',
        'Banana',
        'Cherry',
        'Grape',
        'Mango',
        'Blueberry',
        'Date',
      ]
      const filtered = sample.filter((s) =>
        s.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
      setResults(filtered)
      setLoading(false)
    }, 300)

    return () => clearTimeout(id)
  }, [debouncedQuery])

  return (
    <div className="app">
      <h1>useDebounce demo</h1>

      <label htmlFor="search">Search fruits:</label>
      <input
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search (debounced)..."
        style={{ padding: 8, width: 320 }}
      />

      <div style={{ marginTop: 12 }}>
        <strong>Current value:</strong> {query || <em>—</em>}
      </div>

      <div style={{ marginTop: 6 }}>
        <strong>Debounced value (500ms):</strong>{' '}
        {debouncedQuery || <em>—</em>}
      </div>

      <div style={{ marginTop: 12 }}>
        {loading ? (
          <div>Loading results...</div>
        ) : (
          <ul>
            {results.length === 0 ? (
              <li style={{ color: '#666' }}>No results</li>
            ) : (
              results.map((r) => <li key={r}>{r}</li>)
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
