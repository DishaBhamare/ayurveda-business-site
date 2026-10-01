const Cart = require ("../models/Cart");
const Product = require("../models/Product");


const addToCart = async (req, res) => {
  try {
    // Get logged-in user's ID from auth middleware
    const userId = req.user;

    // Get product ID sent by frontend
    const { productId } = req.body;

    // ===============================
    // Check if product exists
    // ===============================
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // ===============================
    // Find user's cart
    // ===============================
    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    // ===============================
    // If cart doesn't exist, create one
    // ===============================
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      });

      return res.status(201).json({
        message: "Product added to cart",
        cart,
      });
    }

    // ===============================
    // Check if product already exists
    // ===============================
    const existingItem = cart.items.find(
      (item) => item.product._id.toString() === productId
    );

    // If product exists, increase quantity
    if (existingItem) {
      existingItem.quantity++;
    } else {
      // Otherwise add new product
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    // Save updated cart
    await cart.save();

    await cart.populate("items.product");

    // Send success response
    res.status(200).json({
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

///Get Cart
const getCart = async (req, res) => {
    try {

    const user=req.user; //get user from auth middleware
   let cart = await Cart.findOne({ user }).populate("items.product");
      if (!cart) {
       return res.status(200).json({
        cart: {
           items: [],
        },
        message: "Cart is empty",
      });
  }
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


///Update Cart
const updateCart = async (req, res) => {
    try {
       const userId = req.user; // Get logged-in user's ID from auth middleware
      const { productId, action } = req.body; // Get product ID and action (increase/decrease) from request body
      const cart =await Cart.findOne({ user: userId }); // Find user's cart and populate product details
       
      if(!cart){
        return res.status(404).json({
            message: "Cart not found",
        });
      }

      const itemIndex = cart.items.findIndex( // Find the index of the product in the cart
        (item) => item.product.toString() === productId // Compare product IDs as strings
      );
      if (itemIndex === -1) { // If product is not found in the cart
        return res.status(404).json({
          message: "Product not found in cart",
        });
      }
      if(action==='increase'){
        cart.items[itemIndex].quantity++; // Increase the quantity of the product in the cart
      }else if(action==='decrease'){
        if(cart.items[itemIndex].quantity>1){
          cart.items[itemIndex].quantity--; // Decrease the quantity of the product in the cart
        }else{
          cart.items.splice(itemIndex, 1); // Remove the product from the cart if quantity is 1
        }
      }else{
        return res.status(400).json({
          message: "Invalid action. Please use 'increase' or 'decrease'.",
        });
      }
      await cart.save(); // Save the updated cart

      await cart.populate("items.product");
      res.status(200).json({
        message: "Cart updated successfully",
        cart,
      });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//remove from cart
  const removeFromCart = async (req, res) => {
    try{
      const userId = req.user;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
    return res.status(404).json({
        message: "Cart not found",
    });
}

    const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
);

  //if product is not found in the cart, return an error
  if (itemIndex === -1) {
    return res.status(404).json({
        message: "Product not found in cart",
    });
}
    //remove the product from the cart
    cart.items.splice(itemIndex, 1);
    //save the updated cart
    await cart.save();

    //populate the product details in the cart so that the frontend can display them
    await cart.populate("items.product");

    res.status(200).json({
        message: "Product removed from cart",
        cart,
    });

    }catch (error) {
        res.status(500).json({
            message: error.message,
        });
  }
}


module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};