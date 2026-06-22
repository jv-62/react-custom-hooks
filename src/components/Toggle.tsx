import type { JSX } from "react/jsx-runtime";
import useToggle from "../hooks/useToggle";

export default function ToggleComponent(): JSX.Element {
    const [value, toggleValue] = useToggle(false) as [boolean, (next?: boolean) => void];

  return (
    <div>
      <div>{value.toString()}</div>
      <button onClick={() => toggleValue()}>Toggle</button>
      <button onClick={() => toggleValue(true)}>Make True</button>
      <button onClick={() => toggleValue(false)}>Make False</button>
    </div>
  )
}