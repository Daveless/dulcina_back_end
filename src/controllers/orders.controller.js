const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orders.model');
const Product = require('../models/products.model');

exports.findOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: { status: 'pending' },
    include: [
      {
        model: Product,
      },
    ],
  });

  res.status(200).json({
    message: 'orders found',
    results: orders.length,
    orders,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { destination, deliveryDate, productId } = req.body;

  const currentProduct = await Product.findOne({
    where: {
      id: productId,
    },
  });
  const priceCurrentProduct = currentProduct.price;

  const newOrder = await Order.create({
    destination,
    deliveryDate,
    subtotal: priceCurrentProduct,
    total: priceCurrentProduct + 3,
    products: [currentProduct],
  });

  newOrder.addProduct(currentProduct);

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
