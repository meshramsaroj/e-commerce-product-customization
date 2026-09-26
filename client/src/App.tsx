import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Layout from "./component/Layout";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer />

      <Routes>

        {/* Pages WITHOUT Navbar + Sidebar */}
          <Route path="/register" element={<SignUp />} />


        {/* Pages WITH Navbar + Sidebar */}
        <Route element={<Layout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;