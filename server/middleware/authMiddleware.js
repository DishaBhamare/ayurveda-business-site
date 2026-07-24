const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
     // Read the Authorization header =will give us the token sent from the frontend,headers used because we are sending the token in the header of the request
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists 
  if (!authHeader) {
    return res.status(401).json({
    message: "Access Denied. No Token Provided.",
  });
}

// Extract only the token by removing "Bearer " ex.Bearer abc123 then it will extract abc123
const token = authHeader.split(" ")[1];

// Verify whether the token is valid it will decode the token and check if it is valid or not by combining the token with the secret key stored in the .env file
try{
    const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);
// Save the logged-in user's ID inside the request object so that we can access it in the next function,every time we send a request to the backend, we will send the token in the header of the request and this middleware will check if the token is valid or not and if it is valid then it will decode the token and get the user ID from it and save it in the request object so that we can access it in the next function
req.user = decoded.userId;
req.role = decoded.role;

// Everything is valid, continue to the next function
next();
}
catch (error) {

    // Token is invalid, expired, or tampered with
    return res.status(401).json({
      message: "Invalid or Expired Token",
    });

  }
};

module.exports = authMiddleware;

