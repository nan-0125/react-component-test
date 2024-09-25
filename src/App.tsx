import Space from "./components/Space"
import './App.css'
import { ConfigProvider } from "./components/Space/ConfigProvider"

function App() {
  return (
    <>
      <ConfigProvider space={{size: [20,10]}}>
        <Space className="container" direction="horizontal"  wrap={true} align="center" >
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
      </ConfigProvider>

    </>
  )
}

export default App
