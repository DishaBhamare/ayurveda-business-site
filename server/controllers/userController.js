// Import the User model so we can interact with the Users collection
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
const registerUser = async (req, res) => {

  try {

    // Extract data sent from the frontend  (whenever user types anything in frontend it stores it in http body in json format)
    const { name, email, password } = req.body;

    // ===============================
    // Check whether this email already exists
    // ===============================
    const existingUser = await User.findOne({ email });//it return null if user not found no error

    // If user already exists,
    // stop the function and return an error
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Convert the user's plain-text password into a secure hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
    // ===============================
    // Create a new user
    // ===============================
    //here we directly write name,email becuase the mongodb automatically matches it with the name in collection and store it like name:name
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create a JWT token containing the user's ID
    const token = jwt.sign(
    {
      userId: newUser._id,
    },
     process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
   );

    // Send success response
    res.status(201).json({
    message: "User Registered Successfully",

    // Send JWT token to the frontend 
    token,

    // Send only the required user details ,user cannot directly see it ,it is in devloper tools of browser
     user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
    },
});

  } catch (error) {

    // Handle unexpected errors
    res.status(500).json({ 
      message: error.message,
    });

  }
};

  const loginUser = async (req, res) => {
    try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if(!user){
      return res.status(400).json({
        message: "Invalid Email or Password"
      });
    }

    // Compare the entered password with the hashed password stored in MongoDB
    const isMatch = await bcrypt.compare(password, user.password);
    // If password is incorrect
    if (!isMatch) {
     return res.status(400).json({
    message: "Invalid Email or Password",
  });
  }
   const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    )
  res.status(200).json({
    message: "Login Successful",
    token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,  
    },
});
  }
  catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
};

//get user profile
const getProfile = async (req, res) => {

  try {

    // Find the logged-in user using the ID stored by authMiddleware req.user stores the user ID extracted from the JWT token, which was decoded in the authMiddleware. This allows us to retrieve the user's profile information from the database.
    const user = await User.findById(req.user).select("-password");

    // If the user does not exist
    if (!user) {
      return res.status(404).json({
      message: "User not found",
  });
}
      // Send whole obj as we have -password already 
    res.status(200).json(user);

      

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

//update profile 
const updateProfile = async(req,res)=>{
  try{
    const user = await User.findById(req.user);
    if (!user) {
    return res.status(404).json({
        message: "User not found",
    });
}
  const {
    name,
    phone,
    address,
    profilePicture,
    } = req.body;

    if (!name || name.trim() === "") {
    return res.status(400).json({
        message: "Name is required",
    });
  }

  user.name = name;
  user.phone = phone;
  user.address = address;
  user.profilePicture = profilePicture;

  await user.save();
  res.status(200).json({
    message: "Profile updated successfully",
    user,
});

  }catch(error){
     res.status(500).json({
      message: error.message,
    });

  }
}
  
// Export this function so routes can use it
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
};