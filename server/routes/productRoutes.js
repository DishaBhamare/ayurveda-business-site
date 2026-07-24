const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD product (NEW)
router.post(  "/",
  authMiddleware,
  adminMiddleware,
   async (req, res) => {
  try {

    // console.log(req.body);

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete 
router.delete( "/:id",
  authMiddleware,
  adminMiddleware,
   async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.put( "/:id",
  authMiddleware,
  adminMiddleware,
   async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const {
      name,
      description,
      price,
      quantity,
      category,
      image,
      stock,
    } = req.body;

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.category = category;
    product.image = image;
    product.stock = stock;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;