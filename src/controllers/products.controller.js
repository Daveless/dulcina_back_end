const catchAsync = require('../utils/catchAsync');
const Product = require('../models/products.model');

exports.findProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: { status: 'active' },
  });

  res.status(200).json({
    message: 'Products found',
    results: products.length,
    products,
  });
});

exports.createProducts = catchAsync(async (req, res, next) => {
  const { name, imageUrl, price, highlight_date } = req.body;

  const newProduct = await Product.create({
    name,
    imageUrl,
    price,
    highlight_date,
  });

  res.status(200).json({
    message: 'Product created',
    newProduct,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { name, imageUrl, price, highlight_date } = req.body;

  await product.update({
    name,
    imageUrl,
    price,
    highlight_date,
  });

  res.status(200).json({
    message: 'Product updated',
    product,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  res.status(200).json({
    message: 'Product by id found',
    product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({
    status: 'inactive',
  });

  res.status(200).json({
    message: 'Product deleted',
  });
});
