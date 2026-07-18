import { createContext, useState,useEffect,useContext } from "react";
import api from "../services/api";
import AuthContext  from "./AuthContext";

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const { token } = useContext(AuthContext);

// Function to add a product to the cart
// const addToCart = (product) => {
//   console.log("Clicked:", product);

//      // Check if this product already exists in the cart
//   setCartItems((prev) => {
//     console.log("Previous Cart:", prev);

//     const existingProduct = prev.find(
//       (item) => item._id === product._id
//     );

//     console.log("Existing Product:", existingProduct);

//      // If product already exists
//     if (existingProduct) {
//       console.log("Increasing quantity");

//       // Create a new array
//     // Increase quantity only for the matching product
//       return prev.map((item) =>
//         item._id === product._id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//     }

//     console.log("Adding new product");
//  // If product is not found in the cart,
//  // add it with quantity = 1
//     return [...prev, { ...product, quantity: 1 }];
//   });
// };

//load cart 
const loadCart = async () => {
    try {

        const response = await api.get("/cart");

        setCartItems(response.data.cart.items);

    } catch (error) {
        console.log(error);
    }
};

//add to cart
const addToCart = async (product) => {
  try {
    const response = await api.post("/cart/add", {
      productId: product._id,
    });

    setCartItems(response.data.cart.items);

  } catch (error) {
    console.log(error);
  }
};

// // Increase quantity of a product
const increaseQuantity = async (id) => {
    try {

        const response = await api.put(
            "/cart/update",

            {
                productId: id,
                action: "increase"
            }
        );

        setCartItems(response.data.cart.items);

    } catch (error) {
        console.log(error);
    }
};


// Decrease quantity of a product
const decreaseQuantity = async (id) => {
    try {
        const response = await api.put(
            "/cart/update",
            {
                productId: id,
                action: "decrease"
            }
        );

        setCartItems(response.data.cart.items);

    } catch (error) {
        console.log(error);
    }
};

            
  const removeFromCart = async (id) => {
    try {
        const response = await api.delete("/cart/remove", {
            data: { productId: id }
        });
        setCartItems(response.data.cart.items);
    }catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
        loadCart();
    } else {
        setCartItems([]);
    }
}, [token]);

  return (
    <CartContext.Provider
     value={{
  cartItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
   loadCart,
}}
    >
      {children}
    </CartContext.Provider>
  );
};