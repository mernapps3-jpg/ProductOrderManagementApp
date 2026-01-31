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

async function deleteProduct(productId) {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }
  return product;
}

async function getProducts({ search, category, page = 1, limit = 10}) {
    const query = {};

    if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

    if (category) {
    query.category = category;
  }

  const skip = (page - 1) * limit; // (2 - 1) * 10 = 1 * 10 = 10

    const [products, total] = await Promise.all([
    Product.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)              // Skip documents for previous pages
      .limit(limit),           // Limit to the number of products per page
    Product.countDocuments(query) // Count all documents that match the query
  ]);

 return {
    products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };

}

async function getProductById(productId) {
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }
  return product;
}

async function getCategories() {
  const categories = await Product.distinct('category');
  return categories.sort(); // Sort categories alphabetically
}

module.exports = { createProduct, updateProduct, deleteProduct, getProducts, getProductById, getCategories }