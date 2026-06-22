import type { JSX } from 'react'
import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'

export default function UseDebounceDemo(): JSX.Element {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    const id = window.setTimeout(() => {
      const sample = [
        'Apple',
        'Banana',
        'Cherry',
        'Grape',
        'Mango',
        'Blueberry',
        'Date',
      ]
      const filtered = sample.filter((item) =>
        item.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
      setResults(filtered)
      setLoading(false)
    }, 300)

    return () => window.clearTimeout(id)
  }, [debouncedQuery])

  return (
    <div>
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
        <strong>Debounced value (500ms):</strong> {debouncedQuery || <em>—</em>}
      </div>

      <div style={{ marginTop: 12 }}>
        {loading ? (
          <div>Loading results...</div>
        ) : (
          <ul className="resultsList">
            {results.length === 0 ? (
              <li style={{ color: '#666' }}>No results</li>
            ) : (
              results.map((result) => <li key={result}>{result}</li>)
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
