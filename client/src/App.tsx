
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Navbar from './component/Navbar'
import { ToastContainer } from "react-toastify"
import ProductList from './pages/ProductList'

function App() {

  return (
    <>
      <Router>
        <nav>
          <Navbar />
        </nav>
        <main>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<ProductList />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
