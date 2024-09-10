import { useState } from "react"
import Calendar from "./components/Calendar-mini"

function App() {
  const [date, setState] = useState<Date | undefined>(new Date())
  return (
    <>
      <button onClick={() => setState(undefined)}>clear</button>
      <Calendar value={date} onChange={(date) => setState(date)}  />
      {/* <Calendar defaultValue={new Date('2022-1-1')} onChange={(date) => console.log(date.toLocaleDateString())} /> */}
    </>
  )
}

export default App
