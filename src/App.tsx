import { useEffect, useRef, useState } from "react"
import MutateObserver from "./components/MutationObserver";

function App() {
  const [className, setClassName] = useState('aaa')
  useEffect(() => {
    setTimeout(() => setClassName('bbb'), 2000);
  }, [])

  const onMutation: MutationCallback = (mutations) => {
    console.log(mutations)
  }



  return (
    <MutateObserver onMutate={onMutation}>
      <div id="container">
        <div className={className}>
          {
            className === 'aaa' ? <div>aaa</div> : <div>
              <p>bbb</p>
            </div>
          }
        </div>
      </div>
    </MutateObserver>
  )
}

export default App
