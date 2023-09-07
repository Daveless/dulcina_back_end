const catchAsync = require('../utils/catchAsync');
const Product = require('../models/products.model');
const Category = require('../models/categories.model');

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

exports.createProducts = catchAsync(async (req, res, next) => {
  const { name, imageUrl, price, highlight_date, categoryId } = req.body;

  const fixedImgUrl = imageUrl.replace(
    'https:res.cloudinary.comdccvupp4ximageuploadv1693177276dulcinaproducts',
    'https://res.cloudinary.com/dccvupp4x/image/upload/v1693177276/dulcina/products/'
  );
  //quitarle la ruta base a imageUrl
  //

  const newProduct = await Product.create({
    name,
    imageUrl: fixedImgUrl,
    price,
    highlight_date,
    categoryId,
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
