import { useState } from 'react'
import './App.css'
import Content from './components/Content'
import Footer from './components/Footer'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NavBar/>
      <Content/>
      <Footer/>
    </div>
  )
}

export default App
