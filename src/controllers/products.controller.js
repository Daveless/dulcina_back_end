const catchAsync = require('../utils/catchAsync');
const Product = require('../models/products.model');
const Category = require('../models/categories.model');

exports.findBestProducts = catchAsync(async (req, res, next) => {
  const topProducts = await Product.findAll({
    order: [['times_sold', 'DESC']],
    limit: 5,
  });

  res.status(200).json({
    message: 'Products found',
    results: topProducts,
  });
});

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

exports.findProductsByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  const categoryId = await Category.findOne({
    where: { name: category },
  });

  const productsByCategory = await Product.findAll({
    where: {
      categoryId: categoryId.id,
    },
  });

  res.status(200).json({
    message: 'Products found',
    results: productsByCategory.length,
    productsByCategory,
  });
});

exports.findProductsByCategoryId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const products = await Product.findAll({
    where: { categoryId: id },
    limit: 5,
  });

  res.status(200).json({
    message: 'Products found',
    results: products.length,
    products,
  });
});

exports.createProducts = catchAsync(async (req, res, next) => {
  const { name, imageUrl, price, highlight_date, categoryId, description } =
    req.body;

  const fixedImgUrl = imageUrl.replace(
    'https:res.cloudinary.comdccvupp4ximageuploadv1694107604dulcinaproducts',
    'https://res.cloudinary.com/dccvupp4x/image/upload/v1694107604/dulcina/products/'
  );
  //quitarle la ruta base a imageUrl
  //

  const newProduct = await Product.create({
    name,
    imageUrl: fixedImgUrl,
    price,
    highlight_date,
    categoryId,
    description,
  });

  res.status(200).json({
    message: 'Product created',
    newProduct,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { name, imageUrl, price, highlight_date, categoryId } = req.body;
  const productImg = imageUrl.encodeURI(imageUrl);

  await product.update({
    name,
    imageUrl: productImg,
    price,
    highlight_date,
    categoryId,
  });

  res.status(200).json({
    message: 'Product updated',
    product,
  });
});
exports.addTimesSold = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { add_times_sold } = req.body;

  await product.update({
    times_sold: product.times_sold + add_times_sold,
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
