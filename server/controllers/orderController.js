const crypto = require("crypto");
const Cart=require("../models/Cart");
const Order=require("../models/Order");
const Product = require("../models/Product");
const razorpay = require("../config/razorpay");

////////// Create Razorpay Order
const createRazorpayOrder = async (req, res) => {
    try {
        const userId = req.user;
        const cart = await Cart.findOne({user:userId}).populate("items.product");

        if(!cart || cart.items.length===0){
            return res.status(400).json({
                message: "Cart is empty",
            });
        }
        const totalAmount = cart.items.reduce(
            (total,items)=> total + items.product.price * items.quantity,
            0
        )
        const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: `ojasvi_${Date.now()}`,
};

         const razorpayOrder = await razorpay.orders.create(options);

        res.status(201).json({
             razorpayOrderId: razorpayOrder.id,
             amount: razorpayOrder.amount,
             currency: razorpayOrder.currency,
    });

    } catch (error) {
        console.error("Razorpay Order Error:", error);

    res.status(500).json({
        message: "Unable to create payment order",
    });
    }
};

const verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            deliveryDetails
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: "Payment verification failed"
            });
        }
        const userId = req.user;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
            message: "Cart is empty"
    });
}
     const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
}));
        const totalAmount = cart.items.reduce(
         (total, item) => total + item.product.price * item.quantity,
          0
);

        for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
        return res.status(400).json({
            message: `${item.product.name} has only ${item.product.stock} items left in stock`,
        });
    }
}
const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount: totalAmount,
    deliveryDetails: deliveryDetails,
    paymentMethod: "online",
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    razorpaySignature: razorpay_signature,
});

    for (const item of cart.items) {
    await Product.findByIdAndUpdate(
        item.product._id,
        {
            $inc: {
                stock: -item.quantity,
            },
        }
    );
}
        cart.items = [];
       await cart.save();

       res.status(201).json({
        message: "Payment verified and order placed successfully",
        order,
});

    } catch (error) {
        console.error("Payment Verification Error:", error);

        res.status(500).json({
            message: "Unable to verify payment"
        });
    }
};

//////////Place Order
const placeOrder=async(req,res)=>{
    try{
        const { deliveryDetails, paymentMethod } = req.body;
        

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

        const totalAmount = cart.items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
        // Check stock availability
        for (const item of cart.items) {

            if (item.product.stock < item.quantity) {
             return res.status(400).json({
                message: `${item.product.name} has only ${item.product.stock} items left in stock`,
        });
    }

}


    const order = await Order.create({
           user: userId,
           items:orderItems,
           totalAmount: totalAmount,
           deliveryDetails,
           paymentMethod,
    });

    // Reduce product stock
        for (const item of cart.items) {

            await Product.findByIdAndUpdate(
            item.product._id,
            {
            $inc: {  //operator that lets you increment or decrement in mongodb without pulling out the document first
                stock: -item.quantity,
            },
        }
    );

}

     cart.items=[]; //Empty cart once order is created
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

// Restore stock
for (const item of order.items) {

    await Product.findByIdAndUpdate(
        item.product,
        {
            $inc: {
                stock: item.quantity,
            },
        }
    );

}

    order.status = "Cancelled"; // Update the order status to "Cancelled"
    await order.save(); // Save the updated order to the database
    
    res.status(200).json({
        message: "Order cancelled successfully",
        order
    });
 }  // catch (error) {
//     console.error(error);
//     res.status(500).json({
//         message: "Error cancelling order"
//     });
// }
catch (error) {
    console.error(error);

    res.status(500).json({
        message: error.message,
    });
}
}


////admin -get all orders/////////////////////////////
const getAllOrders=async(req,res)=>{
    try{
        // const userId=req.user;
        const orders=await Order.find().populate("items.product").populate("user");
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


////////admin update order status
const updateOrderStatus = async (req, res) => {
    try{
         // get orderId
    const { orderId } = req.params;

    // get status
    const { status } = req.body;

    // find order
    const order=await Order.findById(orderId);


    // order exists?
    if(!order){
        return res.status(404).json({
            message: "Order not found",
        })
    }

    // validate status
    if(!status || !["Pending","Processing","Shipped", "Delivered"].includes(status)){
        return res.status(400).json({
            message: "Invalid status",
        })
    }

     // cancelled?
    if(order.status==="Cancelled"){
        return res.status(400).json({
            message: "Cannot update status of a cancelled order",
        })
    }

     // same status?
    if(order.status===status){
        return res.status(400).json({
            message: "Status is already updated",
        })
    }

    const ORDER_FLOW = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered"
    ];
    const currentIndex = ORDER_FLOW.indexOf(order.status);
    const newIndex = ORDER_FLOW.indexOf(status);
    if (newIndex !== currentIndex + 1) {
    return res.status(400).json({
        message: "Invalid status transition"
    });
}


    // update status
    order.status = status;

    // save
    await order.save();

    // success
    res.status(200).json({
        message: "Order status updated successfully",
        order,
    });



    }catch(error){
       
           console.error(error);

        res.status(500).json({
     message: error.message
});
        
    }
  
}

module.exports = {
    placeOrder,
    getOrders,
    cancelOrder,
    getAllOrders,
    updateOrderStatus,
    createRazorpayOrder,
    verifyRazorpayPayment
};