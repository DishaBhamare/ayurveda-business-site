const express = require("express");
const router = express.Router();

const { addToCart, getCart, updateCart} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

// Add product to cart
router.post("/add", authMiddleware, addToCart);

// Get logged-in user's cart
router.get("/", authMiddleware, getCart);

router.put("/update", authMiddleware, updateCart);

module.exports = router;