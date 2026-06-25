import { useState, type JSX } from 'react'
import './App.css'
import UseDebounceDemo from './components/UseDebounceDemo'
import UseFetchDemo from './components/UseFetchDemo'
import UseTimeoutDemo from './components/UseTimeoutDemo'
import UseToggleDemo from './components/UseToggleDemo'

type HookId = 'debounce' | 'fetch' | 'toggle' | 'timeout'

function App(): JSX.Element {
  const [active, setActive] = useState<HookId | null>('debounce')

  const cards = [
    { id: 'debounce' as HookId, title: 'useDebounce', desc: 'Debounce a changing value' },
    { id: 'fetch' as HookId, title: 'useFetch', desc: 'Fetch data with abort + refetch' },
    { id: 'toggle' as HookId, title: 'useToggle', desc: 'Toggle using the custom hook' },
    { id: 'timeout' as HookId, title: 'useTimeout', desc: 'Timeout using the custom' },
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
            <UseDebounceDemo />
          </div>
        )}

        {active === 'fetch' && (
          <div>
            <h2>useFetch example</h2>
            <UseFetchDemo />
          </div>
        )}
        
        {active === 'toggle' && (
          <div>
            <h2>useToggle example</h2>
            <UseToggleDemo />
          </div>
        )}
        
        {active === 'timeout' && (
          <div>
            <h2>useTimeout example</h2>
            <UseTimeoutDemo />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
