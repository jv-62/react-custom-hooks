import { useEffect, useMemo, useRef, useState } from "react"
import useDeepCompareEffect from "../hooks/useDeepCompareEffect"

export default function UseDeepCompareEffectDemo() {
  const [age, setAge] = useState(0)
  const [otherCount, setOtherCount] = useState(0)
  const useEffectCountRef = useRef<HTMLSpanElement>(null)
  const useDeepCompareEffectCountRef = useRef<HTMLSpanElement>(null)

  const person = useMemo(() => ({ age, name: "Kyle" }), [age])

  useEffect(() => {
    if (useEffectCountRef.current) {
      useEffectCountRef.current.textContent =
        String(parseInt(useEffectCountRef.current.textContent ?? "0") + 1)
    }
  }, [person])

  useDeepCompareEffect(() => {
    if (useDeepCompareEffectCountRef.current) {
      useDeepCompareEffectCountRef.current.textContent = String(
        parseInt(useDeepCompareEffectCountRef.current.textContent ?? "0") + 1
      )
    }
  }, [person])

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <div>
        useEffect: <span ref={useEffectCountRef}>0</span>
      </div>
      <div>
        useDeepCompareEffect: <span ref={useDeepCompareEffectCountRef}>0</span>
      </div>
      <div>Other Count: {otherCount}</div>
      <div>{JSON.stringify(person)}</div>
      <button onClick={() => setAge(currentAge => currentAge + 1)}>
        Increment Age
      </button>
      <button onClick={() => setOtherCount(count => count + 1)}>
        Increment Other Count
      </button>
    </div>
  )
}