import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoutes";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import ProductsPage from "./pages/ProductsPage";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
           path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
        }
        />
         <Route
        path="/my-orders"
        element={
        <ProtectedRoute>
            <MyOrders />
        </ProtectedRoute>
    }
/>
      <Route path="/products" element={<ProductsPage />} />
       <Route path="/wishlist" element={<Wishlist />} />
       <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="products" element={<Products />} />
  <Route path="orders" element={<Orders />} />
</Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;