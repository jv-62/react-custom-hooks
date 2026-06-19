import { useEffect, useState, type JSX } from 'react'
import './App.css'
import useDebounce from './hooks/useDebounce'
import useFetch from './hooks/useFetch'

type HookId = 'debounce' | 'fetch'

function DebounceDemo() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!debouncedQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([])
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
        <strong>Debounced value (500ms):</strong>{' '}
        {debouncedQuery || <em>—</em>}
      </div>

      <div style={{ marginTop: 12 }}>
        {loading ? (
          <div>Loading results...</div>
        ) : (
          <ul className="resultsList">
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

function FetchDemo() {
  const [url, setUrl] = useState<string | null>(null)
  const { data, loading, error, refetch } = useFetch<any>(url)

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setUrl('https://jsonplaceholder.typicode.com/users')}>Load users</button>
        <button onClick={() => setUrl("https://jsonplaceholder.typicode.com/posts")}>Load posts</button>
        <button
          onClick={() => {
            setUrl(null)
          }}
        >
          Clear
        </button>
        <button onClick={() => refetch(url ?? undefined)}>Refetch</button>
      </div>

      <div style={{ marginTop: 12 }}>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>Error: {String(error.message)}</div>}
        {data && (
          <pre style={{ maxHeight: 300, overflow: 'auto', background: '#fff', padding: 12, borderRadius: 6 }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}

function App(): JSX.Element {
  const [active, setActive] = useState<HookId | null>('debounce')

  const cards = [
    { id: 'debounce' as HookId, title: 'useDebounce', desc: 'Debounce a changing value' },
    { id: 'fetch' as HookId, title: 'useFetch', desc: 'Fetch data with abort + refetch' },
  ]

  return (
    <div className="app">
      <h1>Custom Hooks Gallery</h1>

      <div className="cards">
        {cards.map((c) => (
          <div
            key={c.id}
            role="button"
            tabIndex={0}
            className="card"
            onClick={() => setActive(c.id)}
            onKeyDown={(e) => e.key === 'Enter' && setActive(c.id)}
            style={{ outline: active === c.id ? '2px solid #60a5fa' : undefined }}
          >
            <div className="cardTitle">{c.title}</div>
            <div className="cardDesc">{c.desc}</div>
          </div>
        ))}
      </div>

      <div className="panel">
        {active === 'debounce' && (
          <div>
            <h2>useDebounce example</h2>
            <DebounceDemo />
          </div>
        )}

        {active === 'fetch' && (
          <div>
            <h2>useFetch example</h2>
            <FetchDemo />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
