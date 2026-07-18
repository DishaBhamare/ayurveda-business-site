import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { WishlistProvider } from "./context/WishlistContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
  <CartProvider>
    <OrderProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </OrderProvider>
  </CartProvider>
</AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
