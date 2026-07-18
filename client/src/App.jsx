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
      </Routes>

      <Footer />
    </>
  );
}

export default App;