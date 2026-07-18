const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Ojasvi Backend Running 🚀");
});

// Product APIs
app.use("/api/products", productRoutes);

// User APIs
app.use("/api/users", userRoutes);

// Cart APIs
app.use("/api/cart", cartRoutes);

// Order APIs
app.use("/api/orders", orderRoutes);

//wishlist apli
app.use("/api/wishlist",wishlistRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🚀");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.log("DB Connection Error ❌", err);
  });