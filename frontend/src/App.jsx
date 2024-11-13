import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './chat';
import './App.css'
import Form from './form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
    </div>
      
    
  )
}

export default App
