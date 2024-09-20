import dayjs from "dayjs"
import Calendar from "./components/Calendar"
import { useState } from "react"

function App() {
  const [date, setDate] = useState(dayjs())
  return (
    <>
      <Calendar value={date} locale="zh-CN" onChange={setDate} />
    </>
  )
}

export default App
