const catchAsync = require('../utils/catchAsync');
const Category = require('../models/categories.model');

exports.findCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({
    where: { status: 'available' },
  });

  res.status(200).json({
    message: 'Categories found',
    results: categories.length,
    categories,
  });
});

exports.createCategories = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const newCategory = await Category.create({
    name,
  });

  res.status(200).json({
    message: 'Category created',
    newCategory,
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const currentCategory = await Category.findOne({
    where: { id, status: 'available' },
  });

  res.status(200).json({
    message: 'Category by id foundd',
    currentCategory,
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const currentCategory = await Category.findOne({
    where: { id, status: 'active' },
  });

  await currentCategory.update({
    status: 'inactive',
  });

  res.status(200).json({
    message: 'Category deleted',
  });
});
