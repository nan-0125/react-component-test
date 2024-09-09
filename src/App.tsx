import Calendar from "./components/Calendar-mini"

function App() {
  return (
    <>
      <Calendar defaultValue={new Date('2022-1-1')} onChange={(date) => console.log(date.toLocaleDateString())} />
    </>
  )
}

export default App
