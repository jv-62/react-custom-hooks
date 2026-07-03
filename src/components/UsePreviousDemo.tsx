import { useState } from "react"
import usePrevious from "../hooks/usePrevious"

export default function UsePreviousDemo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("Kyle")
  const previousCount = usePrevious(count)

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <div>
        {count} - {previousCount}
      </div>
      <div>{name}</div>
      <button onClick={() => setCount(currentCount => currentCount + 1)}>
        Increment
      </button>
      <button onClick={() => setName("John")}>Change Name</button>
    </div>
  )
}