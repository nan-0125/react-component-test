import dayjs from "dayjs"
import Calendar from "./components/Calendar"

function App() {
  return (
    <>
      <Calendar value={dayjs()}  />
    </>
  )
}

export default App
