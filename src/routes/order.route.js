const express = require('express');
const ordersController = require('../controllers/orders.controller');
const { validProduct } = require('../middlewares/validProduct.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const orderRouter = express.Router();

orderRouter.route('/').post(ordersController.createOrder);

orderRouter.use(authMiddleware.protect);
orderRouter.use(authMiddleware.renew);

orderRouter
  .route('/:id')
  .patch(authMiddleware.restictTo('admin'), ordersController.updateOrder)
  .delete(authMiddleware.restictTo('admin'), ordersController.deleteProduct);

orderRouter
  .route('/')
  .get(authMiddleware.restictTo('admin'), ordersController.findOrders);

module.exports = orderRouter;
