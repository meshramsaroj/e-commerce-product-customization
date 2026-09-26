import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Layout from "./component/Layout";

import { ToastContainer } from "react-toastify";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import CategoryDetails from "./pages/CategoryDetails";
import ProductDetails from "./pages/ProductDetails";

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
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoryDetails />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />


        </Route>

      </Routes>
    </Router>
  );
}

export default App;