import { Outlet, NavLink } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function AdminLayout() {
  const { logout } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login", { replace: true });
};
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white p-6">

        <h1 className="text-2xl font-bold mb-10">
          Ojasvi Admin
        </h1>

        <nav className="flex flex-col gap-4">

          <NavLink
            to="/admin/dashboard"
            className="hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className="hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            className="hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Orders
          </NavLink>

          <button className="mt-10 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg" onClick={handleLogout}>
            Logout
          </button>

        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;