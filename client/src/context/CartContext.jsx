import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


// Function to add a product to the cart
const addToCart = (product) => {
  console.log("Clicked:", product);

     // Check if this product already exists in the cart
  setCartItems((prev) => {
    console.log("Previous Cart:", prev);

    const existingProduct = prev.find(
      (item) => item._id === product._id
    );

    console.log("Existing Product:", existingProduct);

     // If product already exists
    if (existingProduct) {
      console.log("Increasing quantity");

      // Create a new array
    // Increase quantity only for the matching product
      return prev.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    console.log("Adding new product");
 // If product is not found in the cart,
 // add it with quantity = 1
    return [...prev, { ...product, quantity: 1 }];
  });
};



// Increase quantity of a product
const increaseQuantity = (id) => {

  // Update cart based on previous state
  setCartItems((prev) =>

    // Create a new array
    prev.map((item) =>

      // Find matching product
      item._id === id

        // Increase quantity by 1
        ? { ...item, quantity: item.quantity + 1 }

        // Keep other products unchanged
        : item
    )
  );
};

// Decrease quantity of a product
const decreaseQuantity = (id) => {

  setCartItems((prev) =>

    prev
      // Update quantity
      .map((item) =>

        item._id === id
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )

      // Remove products whose quantity becomes 0
      .filter((item) => item.quantity > 0)

  );

};

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  return (
    <CartContext.Provider
     value={{
  cartItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}}
    >
      {children}
    </CartContext.Provider>
  );
};