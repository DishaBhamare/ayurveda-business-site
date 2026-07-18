import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
    const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

    return(
        <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">

         <h1 className="text-3xl font-bold text-green-800 mb-8">
            My WishList
            </h1>
             {wishlistItems.length === 0? (

           <p className="text-gray-600">
              You haven't added anything yet.
           </p>
    ) : (   // wishlistitems will come here
        wishlistItems.map((item) => (

    <div
    key={item.product._id}
    className="border rounded-xl shadow-sm p-6 mb-6"
    >
              {/* Item Details */}
           <h3 className="text-lg font-semibold">
                <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-40 h-40 object-contain"
/>
                  </h3>
           <h3 className="text-xl font-semibold">
            {item.product.name}
            </h3>

        <p className="text-green-700 font-bold">
            ₹{item.product.price}
        </p>

            <button
            onClick={() => removeFromWishlist(item.product._id)}
            >
             Remove
            </button>
 
    </div>
  
))

    )}
  
</div>
   
    );

}
export default Wishlist;