const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orders.model');
const Product = require('../models/products.model');

exports.findOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: { status: 'pending' },
  });

  res.status(200).json({
    message: 'orders found',
    results: orders.length,
    orders,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  const product = await Product.findOne({
    where: {
      id: productId,
    },
  });

  const newOrder = await Order.create({
    total: product.price,
    subtotal: product.price,
    productId,
  });

  res.status(200).json({
    message: 'order created',
    newOrder,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const currentOrder = await Order.findOne({
    where: {
      id,
    },
  });

  await currentOrder.update({
    status: 'completed',
  });

  res.status(200).json({
    message: 'order updated',
    currentOrder,
  });
});
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const currentOrder = await Order.findOne({
    where: {
      id,
    },
  });

  await currentOrder.update({
    status: 'deleted',
  });

  res.status(200).json({
    message: 'order deleted',
    currentOrder,
  });
});
