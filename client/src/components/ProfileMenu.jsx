import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";


function ProfileMenu() {
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <div className="relative">

        <button
            onClick={() => setShowProfileMenu((prev) => !prev)}
        className="text-3xl text-green-700 hover:text-green-800 transition"
        >
        <FaUserCircle />
  </button>

  {showProfileMenu && (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50">

    {user ? (
      <>
        <button
          onClick={() => navigate("/profile")}
          className="block w-full text-left px-4 py-3 hover:bg-gray-100"
        >
          👤 My Profile
        </button>

        <button
          onClick={() => navigate("/my-orders")}
          className="block w-full text-left px-4 py-3 hover:bg-gray-100"
        >
          📦 My Orders
        </button>

        <hr />

        <button
          onClick={() => {
            setShowProfileMenu(false);
            logout();
            navigate("/login");
          }}
          className="block w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
        >
          🚪 Logout
        </button>
      </>
    ) : (
      <>
        <button
          onClick={() => navigate("/login")}
          className="block w-full text-left px-4 py-3 hover:bg-gray-100"
        >
          🔑 Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="block w-full text-left px-4 py-3 hover:bg-gray-100"
        >
          📝 Register
        </button>
      </>
    )}

  </div>
)}

</div>
        
    );
}
export default ProfileMenu;