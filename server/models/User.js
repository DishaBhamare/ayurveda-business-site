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
     phone: {
      type: String,
      default:" ",
    },
    address: {
      type: String,
      default:" ",
    },
    profilePicture: {
      type: String,
      default:" ",
    },

    role:{
      type:String,
      enum:["user","admin"],   //enum make sure that role written by user is either user or admin not any vlaue like superhero 
      default:"user"
    },

  },

  // timestamps Automatically creates
  // createdAt-date at which the user entry is created 
  // updatedAt-date at which it is updated  
  {
    timestamps: true,
  }

);

// Create User Collection
module.exports = mongoose.model("User", userSchema);