const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
    try{
 // Find user
   const user = await User.findById(req.user).select("role");

    // If user doesn't exist
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    // If role is not admin
    if(user.role!=="admin"){
        return res.status(403).json({
            message: "Access denied. Admins only"
        })
    }
    next() // Call the next middleware or route handler

    // next()

}catch(err){
    return res.status(500).json({
       message: err.message
    })
}

}   

module.exports = adminMiddleware;
