import { createContext, useContext, useEffect, useState } from "react";
import  AuthContext  from "./AuthContext";
import api from "../services/api";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

const [wishlistItems, setWishlistItems] = useState([]);
const { token } = useContext(AuthContext);


const loadWishlist = async()=>{
    try{
        const response=await api.get("/wishlist");
        setWishlistItems(response.data.items);


    }catch(error){
        console.log(error);
    }
};

//add to wishlist
const addToWishlist = async(productId)=>{
    try{
        await api.post("/wishlist/add", {
            productId,
        });

        await loadWishlist();


    }catch(error){
        console.log(error);

    }

};
//remove from wishlist
const removeFromWishlist = async (productId) => {
    try {

        await api.delete(`/wishlist/remove/${productId}`);

        await loadWishlist();

    } catch (error) {
        console.log(error);
       
    }
};
//load wishlist whenever user logs in
useEffect(() => {
    if (token) {
        loadWishlist();
    } else {
        setWishlistItems([]);
    }
}, [token]);
return (
    <WishlistContext.Provider
        value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            loadWishlist,
        }}
    >
        {children}
    </WishlistContext.Provider>
);
}