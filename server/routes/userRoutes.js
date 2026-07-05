// Import Express
const express = require("express");


// Create a Router object
const router = express.Router();


// Import the controller functions that will handle the logic for each route
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
// ===============================
// Register Route
// POST /api/users/register

router.post("/register", registerUser);
//login route
router.post("/login", loginUser);
//get user profile route
router.get("/profile", authMiddleware, getProfile);

// Export router
module.exports = router;