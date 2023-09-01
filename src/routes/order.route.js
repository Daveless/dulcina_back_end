const express = require('express');
const ordersController = require('../controllers/orders.controller');
const { validProduct } = require('../middlewares/validProduct.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const productRouter = express.Router();

productRouter
  .route('/:id')
  .patch(authMiddleware.restictTo('admin'), ordersController.updateOrder)
  .delete(authMiddleware.restictTo('admin'), ordersController.deleteProduct);

productRouter
  .route('/')
  .post(ordersController.createOrder)
  .get(authMiddleware.restictTo('admin'), ordersController.findOrders);

module.exports = productRouter;
