import { useEffect, useState } from "react";
import api from "../../services/api";

function Orders() {
    const [orders,setOrders] =useState([]);
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
     const response = await api.put(
    `/orders/${orderId}/status`,
    {
        status,
    }
);
     fetchOrders();

   
} catch (error) {
   console.error(error);
}
}


  
  return (
    <>
   <div> 
  <h1 className="text-3xl font-bold text-green-800 mb-6">Orders</h1> 
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
      {orders.map((order) => ( 
        <tr key={order._id} className="border-b hover:bg-gray-50"> 
          <td className="p-4 font-medium">{order.user.email}</td> 
          <td className="p-4 text-gray-600">₹{order.totalAmount}</td> 
          <td className="p-4">{order.status}</td> 
          <td className="p-4">
         {order.items.length === 1
          ? `${order.items.length} Item`
          : `${order.items.length} Items`}
    </td>
            <td className="p-4 ">
            {new Date(order.createdAt).toLocaleDateString("en-IN")}
          </td> 
          <td className="p-4">
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
</td>
        </tr> 
      ))}
    </tbody>
  </table>
</div>
</>

  );
}

export default Orders;