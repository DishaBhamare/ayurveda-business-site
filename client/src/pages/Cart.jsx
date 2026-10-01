import { useContext } from "react";
// import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";
// import { OrderContext } from "../context/OrderContext";

function Cart() {

  // Get cart data and remove function from Context
 // Get all cart functions from Context
const {
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = useContext(CartContext);

// const { placeOrder, loadOrders } = useContext(OrderContext);


  // Calculate total cart price
  const totalPrice = cartItems.reduce((total, item) => {
  return total + item.product.price * item.quantity;
}, 0);

//   const handleCheckout = async () => {
//     try {
//         await placeOrder();
//         toast.success("Order placed successfully!");
//     } catch (error) {
//         toast.error(error.response?.data?.message || "Order failed");
//     }
// };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">

      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-green-800 mb-8">
        Shopping Cart
      </h1>

      {/* If cart is empty */}
      {cartItems.length === 0 ? (

        <div className="text-center py-20">
  <div className="text-6xl mb-4">🛒</div>

  <h2 className="text-2xl font-bold text-gray-700">
    Your Cart is Empty
  </h2>

  <p className="text-gray-500 mt-2">
    Looks like you haven't added any products yet.
  </p>

  <Link
    to="/products"
    className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
  >
    Continue Shopping
  </Link>
</div>

      ) : (

        <>
          {/* Display every product */}
          <div className="space-y-4">

            {cartItems.map((item) => (

              <div
                key={item.product._id}
                className="border rounded-xl p-5 flex justify-between items-center"
              >

                {/* Left Side */}
                <div>

                  {/* Product Name */}
                  <h3 className="text-lg font-semibold">
                    {item.product.name}
                  </h3>

                  {/* Price of one product */}
                  <p className="text-gray-600">
                    Price : ₹{item.product.price}
                  </p>

                  {/* Quantity */}
                  {/* Quantity Controls */}
<div className="flex items-center gap-4 mt-3">

  {/* Decrease Quantity */}
  <button
    onClick={() => decreaseQuantity(item.product._id)}
    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
  >
    -
  </button>

  {/* Current Quantity */}
  <span className="font-semibold text-lg">
    {item.quantity}
  </span>

  {/* Increase Quantity */}
  <button
    onClick={() => increaseQuantity(item.product._id)}
    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
  >
    +
  </button>

</div>

                  {/* Subtotal */}
                  <p className="font-semibold text-green-700 mt-2">
                    Subtotal : ₹{item.product.price * item.quantity}
                  </p>

                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          {/* Cart Summary */}
          <div className="mt-8 border-t pt-6 flex justify-between items-center">

            <div>

              <h2 className="text-xl font-bold text-green-800">
                Total : ₹{totalPrice}
              </h2>

              <p className="text-gray-500">
                Total Items : {cartItems.length}
              </p>

            </div>

        <Link
           to="/checkout"
           className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
        >
        Checkout
      </Link>

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;