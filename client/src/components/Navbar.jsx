import { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-green-800">
          Ojasvi
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">

          <li>
            <Link to="/" className="hover:text-green-700">
              Home
            </Link>
          </li>

          <li>
            <Link to="/products" className="hover:text-green-700">
              Products
            </Link>
          </li>

          <li>
            <Link to="/" className="hover:text-green-700">
              About
            </Link>
          </li>

          <li>
            <Link to="/" className="hover:text-green-700">
              Contact
            </Link>
          </li>

        </ul>

        {/* Cart + Login */}
        <div className="flex items-center gap-5">

          <Link to="/wishlist" className="relative">
          <FaHeart className="text-2xl text-red-500" />
    </Link>

          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>

          </Link>
                
              {/*Conditional rendering based on user authentication status if user is logged in then show logout button and user name else show login button*/}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">
                Welcome, {user.name}
              </span>
              <button
                 onClick={() => {
                  logout();
                navigate("/login");
                  }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition"
            >
              Login
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;