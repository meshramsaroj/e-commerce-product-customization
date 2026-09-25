
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Navbar from './component/Navbar'

function App() {

  return (
    <>

      <Router>
        <nav>
          <Navbar />
        </nav>
        <main>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
