import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function Wishlist() {
    const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

    return(
        <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">

         <h1 className="text-3xl font-bold text-green-800 mb-8">
            My WishList
            </h1>
             {wishlistItems.length === 0? (

           <div className="text-center py-20">
  <div className="text-6xl mb-4">❤️</div>

  <h2 className="text-2xl font-bold text-gray-700">
    Your Wishlist is Empty
  </h2>

  <p className="text-gray-500 mt-2">
    Save your favorite herbal products here.
  </p>

  <Link
    to="/products"
    className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
  >
    Explore Products
  </Link>
</div>
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