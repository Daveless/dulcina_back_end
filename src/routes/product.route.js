const express = require('express');
const productsController = require('../controllers/products.controller');
const Product = require('../models/products.model');
const { validProduct } = require('../middlewares/validProduct.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const productRouter = express.Router();

productRouter.route('/').get(productsController.findProducts);
productRouter.route('/:id').get(productsController.getProduct);

productRouter.use(authMiddleware.protect);
productRouter.use(authMiddleware.renew);

productRouter
  .route('/')
  .post(authMiddleware.restictTo('admin'), productsController.createProducts);

productRouter
  .route('/:id')
  .patch(validProduct, productsController.updateProduct)
  .delete(validProduct, productsController.deleteProduct);

module.exports = productRouter;
