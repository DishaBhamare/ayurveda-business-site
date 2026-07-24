import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function Orders() {
    const [orders,setOrders] =useState([]);
    //for search bar for searching by email
    const [searchValue, setSearchValue] = useState("");
    //for dropdown for order status
    const [statusFilter, setStatusFilter] = useState("All");
    //for popup if the user clicked view the order from table
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders=async()=>{
        try{
             const response=await api.get("/orders/all")
             setOrders(response.data.orders);
        }catch(error){
            console.error(error);
        }
       
    }

    useEffect(() => {
    fetchOrders();
  }, []);

const handleStatus = async (orderId, status) => {
  try {
     await api.put( `/orders/${orderId}/status`,
    {
        status,
    }
);
toast.success("Order status updated successfully");
     fetchOrders();

   
} catch (error) {
   console.error(error);
   toast.error(
  error.response?.data?.message ||
  "Failed to update order status"
);
}
}

const filteredOrders = orders.filter((order) =>{
    const matchesSearch =  order.user.email
    .toLowerCase()
    .includes(searchValue.toLowerCase());
  const matchesStatus =
    statusFilter === "All"
        ? true
        : order.status === statusFilter;
  return matchesSearch && matchesStatus;
}
 
);

//status color
const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Processing":
      return "bg-blue-100 text-blue-700";

    case "Shipped":
      return "bg-purple-100 text-purple-700";

    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};
  
  return (
    <>
   <div> 
  <h1 className="text-3xl font-bold text-green-800 mb-6">Orders</h1> 
</div> 
<div className="mb-4">
  {/* Search bar */}
  <input
    type="text"
    placeholder="Search by customer email..."
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
    className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
  />

  {/* Status Filter */}
  <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="border rounded-md px-2 py-1"
>
  <option>All</option>
  <option>Pending</option>
  <option>Processing</option>
  <option>Shipped</option>
  <option>Delivered</option>
  <option>Cancelled</option>
</select>
</div>
<div className="bg-white rounded-xl shadow-lg overflow-hidden"> 
  <table className="w-full"> 
    <thead className="bg-green-700 text-white"> 
      <tr> 
       <th className="p-4 text-left">Customer</th>
      <th className="p-4 text-left">Total</th>
       <th className="p-4 text-left">Status</th> 
       <th className="p-4 text-left">Items</th> 
       <th className="p-4 text-left">date</th> 
       <th className="p-4 text-center">Action</th> 
      </tr> 
    </thead> 
    <tbody> 
      {filteredOrders.map((order) => ( 
        <tr key={order._id} className="border-b hover:bg-gray-50"> 
          <td className="p-4 font-medium">{order.user.email}</td> 
          <td className="p-4 text-gray-600">₹{order.totalAmount}</td> 
          <td className="p-4">
          <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
          >
        {order.status}
        </span>
</td>
          <td className="p-4">
         {order.items.length === 1
          ? `${order.items.length} Item`
          : `${order.items.length} Items`}
    </td>
            <td className="p-4 ">
            {new Date(order.createdAt).toLocaleDateString("en-IN")}
          </td> 
          <td className="p-4">
             <div className="flex items-center gap-2">

<button
  onClick={() => setSelectedOrder(order)}
  className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
>
  View
</button>
  {order.status === "Cancelled" ? (
    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">Cancelled</span>
  ) : (
    <select className="border rounded-md px-2 py-1" value={order.status} onChange={(e) => handleStatus(order._id, e.target.value)}>
      <option>Pending</option>
      <option>Processing</option>
      <option>Shipped</option>
      <option>Delivered</option>
    </select>
  )}
  </div>
</td>
        </tr> 
      ))}
    </tbody>
  </table>

</div>
 {selectedOrder && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">

     <div className="flex justify-between items-center mb-6">
  <h2 className="text-2xl font-bold text-green-800">
    Order Details
  </h2>

  <button
    onClick={() => setSelectedOrder(null)}
    className="text-gray-500 hover:text-red-600 text-2xl"
  >
    ✕
  </button>
</div>
 <div className="border rounded-lg p-4 mb-4">
  <h3 className="text-lg font-semibold text-green-700 mb-3">
    Customer Information
  </h3>

  <div className="space-y-2">
    <p>
      <span className="font-semibold">Email:</span>{" "}
      {selectedOrder.user.email}
    </p>

    <p>
      <span className="font-semibold">Status:</span>{" "}
      <span
        className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
          selectedOrder.status
        )}`}
      >
        {selectedOrder.status}
      </span>
    </p>

    <p>
      <span className="font-semibold">Date:</span>{" "}
      {new Date(selectedOrder.createdAt).toLocaleDateString("en-IN")}
    </p>

    <p>
      <span className="font-semibold">Total:</span>{" "}
      ₹{selectedOrder.totalAmount}
    </p>
  </div>
</div>


<div className="border rounded-lg p-4 mb-4">
  <h3 className="text-lg font-semibold text-green-700 mb-3">
    Ordered Products
  </h3>

  <div className="space-y-3">
    {selectedOrder.items.map((item) => (
      <div
        key={item._id}
        className="flex justify-between items-center border-b pb-3"
      >
        <div>
          <p className="font-medium text-gray-800">
            {item.product.name}
          </p>

          <p className="text-sm text-gray-500">
            Quantity: {item.quantity}
          </p>
        </div>

        <p className="font-semibold text-green-700">
          ₹{item.price * item.quantity}
        </p>
      </div>
    ))}
  </div>
</div>

<div className="border rounded-lg p-4">
  <h3 className="text-lg font-semibold text-green-700 mb-3">
    Address Details
  </h3>

  <div className="space-y-2">
    <p>
      <span className="font-semibold">Name:</span>{" "}
      {selectedOrder.user.name}
    </p>

    <p>
      <span className="font-semibold">Phone:</span>{" "}
      {selectedOrder.user.phone}
    </p>

    <p>
      <span className="font-semibold">Address:</span>{" "}
      {selectedOrder.user.address}
    </p>
  </div>
</div>

    </div>
  </div>
)}
</>

  );
}

export default Orders;