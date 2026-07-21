const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
   try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
     const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({status:"Pending"});
    const revenueResult  = await Order.aggregate([
        {
        $match: {
        status: { $in: ["Shipped", "Delivered"] }
     }
     },
    {
        $group: {
         _id: null,
        totalRevenue: {
        $sum: "$totalAmount"
      }
    }
  }
]);
const totalRevenue =
  revenueResult.length === 0
    ? 0
    : revenueResult[0].totalRevenue;

    return res.status(200).json({
  totalProducts,
  totalUsers,
  totalOrders,
  pendingOrders,
  totalRevenue,
});

   } catch (error) {
         console.error(error);
  return res.status(500).json({
    message: "Internal Server Error",
  });
   }
};

module.exports = {
  getDashboardStats,
};