import Product from "../Models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc     Fetch all Productsrs
// @desc     GET /api/products
// @desc     access public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc     Fetch single Product
// @desc     GET /api/products/:id
// @desc     access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

// @desc     DELETE Product
// @desc     DELETE /api/products/:id
// @desc     private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({
      message: "Product Removed.",
    });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

// @desc     create a Product
// @desc     POST /api/products
// @desc     private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample Name",
    user: req.user._id,
    image: "/images/sample.jpg",
    description: "Sample Description",
    price: 0,
    brand: "sample Brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc     update a Product
// @desc     PUT /api/products/:id
// @desc     private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
};
