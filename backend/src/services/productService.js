<<<<<<< HEAD
const Product = require('../models/Product');

async function createProduct({ name, description, price, category, stock, image }) {
    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        image
    })
    return product;
}

// Update existing product (admin only)
=======
const Product = require("../models/Product");

async function createProduct({ name, description, price, category, stock, image }) {
  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    image
  });
  return product;
}

>>>>>>> 6432981299144a67202438b1066a4f3b7c231d0f
async function updateProduct(productId, { name, description, price, category, stock, image }) {
  const product = await Product.findByIdAndUpdate(
    productId,
    { name, description, price, category, stock, image },
    // { new: true, runValidators: true } means:
    // - new: true --> Return the modified (updated) document instead of the original.
    // - runValidators: true --> Ensure the model's validation rules are applied when updating.
    { new: true, runValidators: true }
  );

  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  return product;
}

<<<<<<< HEAD
// Delete product (admin only)
=======
>>>>>>> 6432981299144a67202438b1066a4f3b7c231d0f
async function deleteProduct(productId) {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }
  return product;
}

<<<<<<< HEAD
// Get all products with search, filter, and pagination
async function getProducts({ search, category, page = 1, limit = 10 }) {
  const query = {};
  if (search) {
=======
async function getProducts({ search, category, page = 1, limit = 10}) {
    const query = {};

    if (search) {
>>>>>>> 6432981299144a67202438b1066a4f3b7c231d0f
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

<<<<<<< HEAD
  // Filter by category
  if (category) {
    query.category = category;
  }

  const skip = (page - 1) * limit; // (2 - 1) = 1 * 10 = 10 // Pagination

  const [products, total] = await Promise.all([
=======
    if (category) {
    query.category = category;
  }

  const skip = (page - 1) * limit; // (2 - 1) * 10 = 1 * 10 = 10

    const [products, total] = await Promise.all([
>>>>>>> 6432981299144a67202438b1066a4f3b7c231d0f
    Product.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)              // Skip documents for previous pages
      .limit(limit),           // Limit to the number of products per page
    Product.countDocuments(query) // Count all documents that match the query
  ]);

<<<<<<< HEAD
  return {
=======
 return {
>>>>>>> 6432981299144a67202438b1066a4f3b7c231d0f
    products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
<<<<<<< HEAD
}

// Get single product by ID
=======

}

>>>>>>> 6432981299144a67202438b1066a4f3b7c231d0f
async function getProductById(productId) {
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }
  return product;
}

<<<<<<< HEAD
// Get all unique categories for filter dropdown
=======
>>>>>>> 6432981299144a67202438b1066a4f3b7c231d0f
async function getCategories() {
  const categories = await Product.distinct('category');
  return categories.sort(); // Sort categories alphabetically
}

<<<<<<< HEAD
module.exports = { createProduct, updateProduct, deleteProduct, getProducts, getProductById, getCategories };
=======
module.exports = { createProduct, updateProduct, deleteProduct, getProducts, getProductById, getCategories }
>>>>>>> 6432981299144a67202438b1066a4f3b7c231d0f
