import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";

function Dashboard() {
 
  const [stats, setStats] = useState({});

 const fetchDashboardStats = async () => {
  try {
    const response = await api.get("/admin/dashboard");
    setStats(response.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchDashboardStats();
}, []);

const dashboardCards = [
  {
    title: "Products",
    value: stats.totalProducts,
    icon: <FaBox />,
  },
  {
    title: "Users",
    value: stats.totalUsers,
    icon: <FaUsers />,
  },
  {
    title: "Orders",
    value: stats.totalOrders,
    icon: <FaShoppingCart />,
  },
  {
    title: "Pending Orders",
    value: stats.pendingOrders,
    icon: <FaClock />,
  },
  {
    title: "Revenue",
    value: `₹${stats.totalRevenue}`,
    icon: <FaRupeeSign />,
  },
];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {dashboardCards.map((card) => (
    <div
      key={card.title}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <div className="text-3xl text-green-700 mb-3">
       {card.icon}
    </div>
      <h3 className="text-gray-500 text-sm">
        {card.title}
      </h3>

      <p className="text-3xl font-bold text-green-700 mt-2">
        {card.value}
      </p>
    </div>
  ))}
</div>
    
  );
}

export default Dashboard;