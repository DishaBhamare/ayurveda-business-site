import { useEffect, useState } from "react";
import api from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
});

const [isEditMode, setIsEditMode] = useState(false);
const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //add new product
  const handleAddChange = (e) => {
  const { name, value } = e.target;

  setNewProduct((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  //delete the product 
  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {

    await api.delete(`/products/${id}`);

    fetchProducts();

  } catch (error) {
    console.error(error);
  }

};

const handleAddProduct = async () => {
  try {

    if (isEditMode) {

      await api.put(`/products/${editingId}`, newProduct);

    } else {

      await api.post("/products", newProduct);

    }

    fetchProducts();

    setNewProduct({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });

    setShowForm(false);
    setIsEditMode(false);
    setEditingId(null);

  } catch (error) {
    console.error(error);
  }
};
//edit product
const handleEdit = (product) => {
  setNewProduct({
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    stock: product.stock,
    image: product.image,
  });

  setEditingId(product._id);
  setIsEditMode(true);
  setShowForm(true);
};


  useEffect(() => {
    fetchProducts();
  }, []);

  
   return (
  <div>
   <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold text-green-800">
    Products
  </h1>

  <button
    onClick={() => setShowForm(!showForm)}
    className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg"
  >
    {showForm ? "Close Form" : "+ Add Product"}
  </button>
</div>

{showForm && (
  <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

    <h2 className="text-2xl font-semibold mb-6">
      Add Product
    </h2>

    <div className="grid grid-cols-2 gap-4">

      <input
        className="border rounded-lg p-3"
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={handleAddChange}
      />

      <input
        className="border rounded-lg p-3"
        name="category"
        placeholder="Category"
        value={newProduct.category}
        onChange={handleAddChange}
      />

      <input
        className="border rounded-lg p-3"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleAddChange}
      />

      <input
        className="border rounded-lg p-3"
        name="stock"
        placeholder="Stock"
        value={newProduct.stock}
        onChange={handleAddChange}
      />

    </div>

    <textarea
      className="border rounded-lg p-3 w-full mt-4"
      rows="4"
      name="description"
      placeholder="Description"
      value={newProduct.description}
      onChange={handleAddChange}
    />

    <input
      className="border rounded-lg p-3 w-full mt-4"
      name="image"
      placeholder="Image URL"
      value={newProduct.image}
      onChange={handleAddChange}
    />

    <div className="flex gap-4 mt-6">

      <button
        onClick={handleAddProduct}
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg"
      >
        {isEditMode ? "Update Product" : "Add Product"}
      </button>

      <button
        onClick={() => setShowForm(false)}
        className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-lg"
      >
        Cancel
      </button>

    </div>

  </div>
)}

    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      <table className="w-full">

        <thead className="bg-green-700 text-white">

          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-center">Actions</th>
          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product._id} className="border-b">

              <td className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>

              <td className="p-4">{product.name}</td>

              <td className="p-4">{product.category}</td>

              <td className="p-4">₹{product.price}</td>

              <td className="p-4">{product.stock}</td>

              <td className="p-4 text-center">

            <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
            onClick={() => handleEdit(product)}
            >
             Edit
            </button>

                <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                 onClick={() => handleDelete(product._id)}
                >
                 Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  </div>
);
}

export default Products;
