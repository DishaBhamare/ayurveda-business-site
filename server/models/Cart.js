const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
user: {
  type: mongoose.Schema.Types.ObjectId,  //Specifies that the field must store a 24-character hexadecimal MongoDB ObjectId.
  ref: "User",
  required: true,
  unique: true,
},
items: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
],
})
module.exports = mongoose.model("Cart", cartSchema);