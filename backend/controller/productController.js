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

export { getProducts, getProductById };