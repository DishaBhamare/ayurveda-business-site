const express=require("express");
const router=express.Router();

const {placeOrder,getOrders,cancelOrder,getAllOrders}=require("../controllers/orderController");
const authMiddleware=require("../middleware/authMiddleware");
const adminMiddleware=require("../middleware/adminMiddleware");

//placeorder
router.post("/place",authMiddleware,placeOrder);
//getorder
router.get("/my-orders",authMiddleware,getOrders);
//cancelOrder
router.put("/cancel/:orderId",authMiddleware,cancelOrder);
//admin -get all orders
router.get("/all",authMiddleware,adminMiddleware,getAllOrders);

module.exports=router;