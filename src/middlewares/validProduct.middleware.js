const Product = require('../models/products.model');
const AppError = require('../utils/appError');

exports.validProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!product) {
    return next(new AppError(`Product with id: ${id} not found`, 404));
  }

  req.product = product;
  next();
});
