import type { JSX } from 'react'
import { useState } from 'react'
import useFetch from '../hooks/useFetch'

export default function UseFetchDemo(): JSX.Element {
  const [url, setUrl] = useState('')
  const { data, loading, error, refetch } = useFetch<any>(url)

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => setUrl('https://jsonplaceholder.typicode.com/users')}>
          Load users
        </button>
        <button onClick={() => setUrl('https://jsonplaceholder.typicode.com/posts')}>
          Load posts
        </button>
        <button onClick={() => setUrl('')}>
          Clear
        </button>
        <button onClick={() => void refetch(url || undefined)}>Refetch</button>
      </div>

      <div style={{ marginTop: 12 }}>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>Error: {String(error.message)}</div>}
        {!loading && !error && !data && (
          <div style={{ color: '#666' }}>Select a URL to fetch data.</div>
        )}
        {data && (
          <pre style={{ maxHeight: 300, overflow: 'auto', background: '#fff', padding: 12, borderRadius: 6 }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
