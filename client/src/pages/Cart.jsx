import { useContext } from "react";

import { CartContext } from "../context/CartContext";

function Cart() {

  // Get cart data and remove function from Context
 // Get all cart functions from Context
const {
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = useContext(CartContext);


  // Calculate total cart price
  const totalPrice = cartItems.reduce((total, item) => {
  return total + item.price * item.quantity;
}, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">

      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-green-800 mb-8">
        Shopping Cart
      </h1>

      {/* If cart is empty */}
      {cartItems.length === 0 ? (

        <p className="text-gray-600">
          Your cart is empty.
        </p>

      ) : (

        <>
          {/* Display every product */}
          <div className="space-y-4">

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="border rounded-xl p-5 flex justify-between items-center"
              >

                {/* Left Side */}
                <div>

                  {/* Product Name */}
                  <h3 className="text-lg font-semibold">
                    {item.name}
                  </h3>

                  {/* Price of one product */}
                  <p className="text-gray-600">
                    Price : ₹{item.price}
                  </p>

                  {/* Quantity */}
                  {/* Quantity Controls */}
<div className="flex items-center gap-4 mt-3">

  {/* Decrease Quantity */}
  <button
    onClick={() => decreaseQuantity(item._id)}
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
    onClick={() => increaseQuantity(item._id)}
    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
  >
    +
  </button>

</div>

                  {/* Subtotal */}
                  <p className="font-semibold text-green-700 mt-2">
                    Subtotal : ₹{item.price * item.quantity}
                  </p>

                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
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

            <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800">
              Checkout
            </button>

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;