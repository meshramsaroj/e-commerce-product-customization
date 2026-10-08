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
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminLayout from "./component/Layouts/AdminLayout";

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
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;