import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import AuthContext from "./AuthContext";
import api from "../services/api";


export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const { loadCart } = useContext(CartContext);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const loadOrders = async () => {
    try {

        const response = await api.get("/orders/my-orders");

        setOrders(response.data.orders);

    } catch (error) {
        console.error(error);
    }
};


const placeOrder = async () => {
    try {

        // 1. API call
        const response = await api.post("/orders/place");

        // Refresh cart
        await loadCart();

        // Refresh orders
        await loadOrders();
        // 3. Navigate
        navigate("/my-orders");

        // 4. Return response if needed
        return response.data;

    } catch (error) {

       console.error("OrderContext:", error);

        throw error;   // ✅ Re-throw it

    }
}
    const cancelOrder = async (orderId) => {
        try{
            const response = await api.put(`/orders/cancel/${orderId}`);
            // Refresh orders after cancellation
            await loadOrders();
            return response.data;

        }catch(error){
            console.error("OrderContext:", error);
            throw error;
        }

}
 useEffect(() => {
    if (token) {
        loadOrders();
    } else {
        setOrders([]);
    }
}, [token]);

 return (
        <OrderContext.Provider
    value={{
        orders,
        placeOrder,
        loadOrders,
        cancelOrder
    }}
>
    {children}
</OrderContext.Provider>
    );
}