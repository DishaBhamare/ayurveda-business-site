import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, loadCart } = useContext(CartContext);
  const { placeOrder, loadOrders } = useContext(OrderContext);
  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
  paymentMethod: "",
});
const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const totalPrice=cartItems.reduce((total,item)=>{
    return total + item.product.price * item.quantity;
  },0);


  const handlePlaceOrder = async () => {
    
  if (
    !formData.name ||
    !formData.phone ||
    !formData.address ||
    !formData.city ||
    !formData.pincode ||
    !formData.paymentMethod
  ) {
    alert("Please fill all delivery and payment details.");
    return;
  }

  setIsPlacingOrder(true);

try {
    if (formData.paymentMethod === "online") {
        await handleRazorpayPayment();
    } else {
        await placeOrder(formData);
    }
} catch (error) {
    setIsPlacingOrder(false);
    alert("Unable to place order. Please try again.");
}
};

const handleRazorpayPayment = async () => {
  try {
    const response = await api.post("/orders/create-razorpay-order");

    const options = {
     key: "rzp_test_ThReG3EuCoo52h",
     amount: response.data.amount,
     currency: response.data.currency,
     name: "Ojasvi",
     description: "Ojasvi Order",
     order_id: response.data.razorpayOrderId,

 handler: async function (paymentResponse) {
  try {
    const response = await api.post("/orders/verify-razorpay-payment", {
      razorpay_order_id: paymentResponse.razorpay_order_id,
      razorpay_payment_id: paymentResponse.razorpay_payment_id,
      razorpay_signature: paymentResponse.razorpay_signature,

      deliveryDetails: {
       name: formData.name,
       phone: formData.phone,
       address: formData.address,
       city: formData.city,
       pincode: formData.pincode,
},
    });

    await loadCart();
    await loadOrders();
    navigate("/my-orders");

  } catch (error) {
  console.error(
    "Payment Verification Error:",
    error.response?.data || error
  );

  setIsPlacingOrder(false);
  alert("Payment verification failed. Please contact support.");
}
},
  prefill: {
    name: formData.name,
    contact: formData.phone,
  },

  theme: {
    color: "#15803d",
  },
  modal: {
    ondismiss: function () {
        setIsPlacingOrder(false);
    },
},
};

const razorpay = new window.Razorpay(options);
razorpay.on("payment.failed", function () {
    setIsPlacingOrder(false);
    alert("Payment failed. Please try again.");
});
razorpay.open();

  }  catch (error) {
  console.error(
    "Razorpay Payment Error:",
    error.response?.data || error
  );

  setIsPlacingOrder(false);
  alert("Unable to start online payment. Please try again.");
}
};

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen">

      <h1 className="text-3xl font-bold text-green-800 mb-8">
        Checkout
      </h1>

      <div className="border rounded-xl p-6">

  <h2 className="text-xl font-bold text-green-800 mb-6">
    Delivery Details
  </h2>

  <div className="space-y-4">

    <div>
      <label className="block font-medium mb-1">
        Full Name
      </label>

      <input
        type="text"
        
        value={formData.name}
        onChange={(e)=>
          setFormData({...formData,name:e.target.value})
        }
        className="w-full border rounded-lg px-4 py-3"
        placeholder="Enter your full name"
      />
    </div>

    <div>
      <label className="block font-medium mb-1">

        Phone Number
      </label>

      <input
        type="tel"
        value={formData.phone}
        onChange={(e)=>
          setFormData({...formData,phone:e.target.value})
        }
        className="w-full border rounded-lg px-4 py-3"
        placeholder="Enter your phone number"
      />
    </div>

    <div>
      <label className="block font-medium mb-1">
        Delivery Address
      </label>

      <textarea
        rows="3"
        className="w-full border rounded-lg px-4 py-3"
        placeholder="House no., street, area"
        value={formData.address}
        onChange={(e)=>
          setFormData({...formData,address:e.target.value})
        }
      />
    </div>
      <div className="grid sm:grid-cols-2 gap-4">

      <div>
        <label className="block font-medium mb-1">
          City
        </label>

        <input
          type="text"
          className="w-full border rounded-lg px-4 py-3"
          placeholder="Enter your city"
          value={formData.city}
          onChange={(e)=>
            setFormData({...formData,city:e.target.value})
          }
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          Pincode
        </label>

        <input
          type="text"
          className="w-full border rounded-lg px-4 py-3"
          placeholder="Enter your pincode"
          value={formData.pincode}
          onChange={(e)=>
            setFormData({...formData,pincode:e.target.value})
          }
        />
      </div>

    </div>

  </div>
  <div className="border rounded-xl p-6 mt-6">

  <h2 className="text-xl font-bold text-green-800 mb-6">
    Payment Method
  </h2>

  <div className="space-y-3">

    <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
      <input
        type="radio"
        name="payment"
         value="online"
        checked={formData.paymentMethod === "online"}
        onChange={(e) =>
       setFormData({ ...formData, paymentMethod: e.target.value })
}
      />

     <span className="font-semibold">
       💳 Online Payment
    </span>
    </label>

    <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
      <input
        type="radio"
        name="payment"
        value="cod"
        checked={formData.paymentMethod === "cod"}
        onChange={(e) =>
        setFormData({ ...formData, paymentMethod: e.target.value })
}
      />

      <span className="font-semibold">
        💵 Cash on Delivery
      </span>
    </label>

  </div>

</div>
<div className="border rounded-xl p-6 mt-6">

  <h2 className="text-xl font-bold text-green-800 mb-6">
    Order Summary
  </h2>
  {cartItems.map((item)=>(
    <div
    key={item.product._id}
    className="flex justify-between border-b py-3"
  >
    
     <span>
      {item.product.name} x {item.quantity}
   </span>
   
    <span>
      {item.product.price * item.quantity}
    </span>
  </div>
  ))}
<p className="text-lg font-semibold">
  Total Amount: ₹{totalPrice}
</p>
<button
onClick={handlePlaceOrder}
  className="w-full mt-6 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
  disabled={isPlacingOrder}
>

  {isPlacingOrder ? "Processing..." : "Place Order"}
</button>

</div>

  </div>

</div>

    
  );
}

export default Checkout;