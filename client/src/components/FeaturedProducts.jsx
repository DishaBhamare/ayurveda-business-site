import { products } from "../data/products";

function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-green-800 mb-3">
          Featured Products
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Natural Ayurvedic products for your daily wellness
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300 bg-white"
            >
              {/* Image placeholder for now */}
              <div className="h-40 bg-green-50 rounded-xl mb-4 flex items-center justify-center text-green-300">
                Image Coming Soon
              </div>

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
              <div className="flex justify-between items-center mt-4">
                <p className="text-green-800 font-bold">
                  {product.price}
                </p>

                <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 text-sm">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;