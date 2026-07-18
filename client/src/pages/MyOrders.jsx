import {useContext} from "react";
import { OrderContext } from "../context/OrderContext";

function MyOrders() {

    // Context here
    const { orders, cancelOrder } = useContext(OrderContext);

    return (
       
        <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">

         <h1 className="text-3xl font-bold text-green-800 mb-8">
            My Orders
            </h1>
             {orders.length === 0 ? (

           <p className="text-gray-600">
              You haven't placed any orders yet.
           </p>
    ) : (   // Orders will come here
        orders.map((order) => (

    <div
    key={order._id}
    className="border rounded-xl shadow-sm p-6 mb-6"
    >
              {/* Order Details */}
           <h3 className="text-lg font-semibold">
                    Order ID: {order._id}
                  </h3>
            <h3 className="text-lg font-semibold">
                    Order Status: {order.status}
                  </h3>
            <h3 className="text-lg font-semibold">
                    Total Amount: ₹{order.totalAmount.toFixed(2)}
                  </h3>
        

        {order.items.map((item) => (

            <div key={item.product._id}
             className="mt-3 border-t pt-3"
            >

                {/* Product Details */}
                <h4 className="font-semibold text-green-700 mt-4 mb-2">
                Products
                </h4>
                <h4 className="text-md font-medium">
                    Product: {item.product.name}
                </h4>
                <p className="text-gray-600">
                    Quantity: {item.quantity}
                </p>
                <p className="text-gray-600">
                    Price: ₹{item.price}
                    </p> 
                <p className="text-gray-600">
                   Subtotal: ₹{item.price * item.quantity}
                </p>

            </div>
              
         
        ))}
         {order.status === "Pending" && (
       <button
         onClick={() => cancelOrder(order._id)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
            Cancel Order
        </button>
)}

    </div>

))

    )}
</div>
        
    );
}

export default MyOrders;

