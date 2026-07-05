const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  weight: String,
  description: String,
  category: String,
  image: String
});

module.exports = mongoose.model("Product", productSchema);
