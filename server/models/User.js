const mongoose = require("mongoose");

// Create the structure of every user
const userSchema = new mongoose.Schema(

  {

    // User's Full Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // User Email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Hashed Password
    password: {
      type: String,
      required: true,
    },

    role:{
      type:String,
      enum:["user","admin"],
      default:"user"
    },

  },

  // Automatically creates
  // createdAt
  // updatedAt
  {
    timestamps: true,
  }

);

// Create User Collection
module.exports = mongoose.model("User", userSchema);