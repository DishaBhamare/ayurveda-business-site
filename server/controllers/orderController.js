const Cart=require("../models/Cart");
const Order=require("../models/Order");

//////////Place Order
const placeOrder=async(req,res)=>{
    try{
        const userId=req.user;
        const cart=await Cart.findOne({user:userId}).populate("items.product");

        if(!cart||cart.items.length===0){
            return res.status(400).json({
                message:"Cart is empty",
            });
        }

        const orderItems=cart.items.map((item)=>({
            product:item.product._id,
            quantity:item.quantity,
            price:item.product.price,
        }));

        const totalAmount=cart.items.reduce((total,item)=>{
            return total+item.product.price*item.quantity;
        },0)

    const order = await Order.create({
           user: userId,
           items:orderItems,
           totalAmount: totalAmount,
    });
     cart.items=[];
     await cart.save();
     res.status(201).json({
        message:"Order placed successfully",
        order,
     });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error placing order" });
    }
}

////Get Orders
const getOrders=async(req,res)=>{
    try{
        const userId=req.user;
        const orders=await Order.find({user:userId}).populate("items.product");
        if(!orders||orders.length===0){
            return res.status(200).json({
                message:"No orders found",
            });
        }
        res.status(200).json({
            message:"Orders fetched successfully",
            orders,

        });

        
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Error fetching orders" });
    }
};

/////cancel Order
const cancelOrder=async(req,res)=>{
    const userId=req.user;
    const {orderId}=req.params;  //req.params is used to get the orderId from the request parameters, which is passed in the URL when making the request to cancel an order. For example, if the endpoint is /orders/:orderId/cancel, then req.params.orderId will give us the value of orderId from the URL.
    try{
        const order=await Order.findOne({_id:orderId,user:userId}); //find the order by its ID and the user ID to ensure that the order belongs to the logged-in user. This is important for security reasons, as we don't want users to cancel orders that don't belong to them.

   if (!order) {
    return res.status(404).json({
        message: "Order not found",
    });
}
        if (
             order.status === "Shipped" ||
             order.status === "Delivered" ||
             order.status === "Cancelled"
        ) {
     return res.status(400).json({
        message: `Order cannot be cancelled because it is ${order.status}`,
     });
} 

    order.status = "Cancelled"; // Update the order status to "Cancelled"
    await order.save(); // Save the updated order to the database
    
    res.status(200).json({
        message: "Order cancelled successfully",
        order
    });
}   catch (error) {
    console.error(error);
    res.status(500).json({
        message: "Error cancelling order"
    });
}
}
module.exports = {
    placeOrder,
    getOrders,
    cancelOrder,
};