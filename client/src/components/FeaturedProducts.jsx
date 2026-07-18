import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";



function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  const { addToCart } = useContext(CartContext);

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // Filtering logic
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-800 mb-3">
          Featured Products
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Natural Ayurvedic products for your daily wellness
        </p>

        {/* FILTER BUTTONS */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className="px-4 py-2 bg-green-100 rounded"
          >
            All
          </button>

          <button
            onClick={() => setFilter("skincare")}
            className="px-4 py-2 bg-green-100 rounded"
          >
            Skincare
          </button>

          <button
            onClick={() => setFilter("haircare")}
            className="px-4 py-2 bg-green-100 rounded"
          >
            Haircare
          </button>

          <button
            onClick={() => setFilter("haircare/oils")}
            className="px-4 py-2 bg-green-100 rounded"
          >
            Oils
          </button>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

          {filteredProducts.slice(0, 4).map((product) => (
            <div
              key={product._id}
              className="border rounded-2xl shadow-md hover:shadow-xl transition bg-white overflow-hidden"
            >
              {/* IMAGE */}
              <img
                 src={
                  product.image && product.image.trim() !== ""
                  ? product.image
                  : "https://via.placeholder.com/300x200"
                  }
                alt={product.name}
               className="w-full h-72 object-contain bg-gray-50 p-2"
                />

              <div className="p-5">

                {/* Category */}
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {product.category}
                </span>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-800 mt-3">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {product.description}
                </p>

                {/* Price + Button */}
                <div className="flex justify-between items-center mt-5">

                  <p className="text-green-800 font-bold">
                    ₹{product.price}
                  </p>
                  <p className="text-green-800 font-bold">
                    {product.weight}
                  </p>

                  <button
                   onClick={() => addToCart(product)}
                   className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 text-sm transition"
                      >
                    Add to Cart
                   </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;