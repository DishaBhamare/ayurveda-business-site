const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("DB Connected");
    // Delete all existing products
await Product.deleteMany({});
    await Product.insertMany([
      {
        name: "Powder Facewash",
        price: 80,
        description: "Herbal facewash for glow and acne control",
        category: "skincare",
        weight: "50g",
        image: "/images/facewash.jpg"
      },
      {
        name: "Herbal Hair Powder",
        price: 350,
        weight: "250g",
        description: "Strengthens hair roots naturally",
        category: "haircare",
        image: "/images/hairpowder.jpg"
      },
      {
        name: "Orange Peel Powder",
        price: 99,
        weight: "80g",
        description: "Brightens skin naturally",
        category: "skincare",
        image: ""
      },
      {
        name: "Herbal Hair Oil",
        price: 220,
        weight: "100ml",
        description: "Nourishes scalp and reduces hair fall",
        category: "haircare/oils",
        image: "/images/hairoil.jpg"
      },
      {
        name: "Hibiscus Face Mask",
        price: 180,
        weight: "100g",
        description: "Natural glow and acne control",
        category: "skincare",
        image: ""
      }
    ]);

    console.log("Products inserted 🚀");
    process.exit();
  })
  .catch(err => console.log(err));