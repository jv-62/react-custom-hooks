import type { Dispatch, SetStateAction } from "react"
import { useState } from "react"
import useStateWithHistory from "../hooks/useStateWithHistory"

export default function StateWithHistoryDemo() {
  const [count, setCount, history, pointer, back, forward, go] =
    useStateWithHistory(1) as [
      number,
      Dispatch<SetStateAction<number>>,
      number[],
      number,
      () => void,
      () => void,
      (index: number) => void
    ]
  const [name, setName] = useState("Kyle")

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <div>{count}</div>
      <div>{history.join(", ")}</div>
      <div>Pointer - {pointer}</div>
      <div>{name}</div>
      <button onClick={() => setCount(currentCount => currentCount * 2)}>
        Double
      </button>
      <button onClick={() => setCount(currentCount => currentCount + 1)}>
        Increment
      </button>
      <button onClick={back}>Back</button>
      <button onClick={forward}>Forward</button>
      <button onClick={() => go(2)}>Go To Index 2</button>
      <button onClick={() => setName("John")}>Change Name</button>
    </div>
  )
}