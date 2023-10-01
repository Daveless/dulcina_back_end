const express = require('express');
const productsController = require('../controllers/products.controller');
const { validProduct } = require('../middlewares/validProduct.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const validation = require('../middlewares/validation.middleware');

const productRouter = express.Router();

productRouter.route('/').get(productsController.findProducts);
productRouter.route('/:id').get(validProduct, productsController.getProduct);
productRouter
  .route('/category/:category')
  .get(productsController.findProductsByCategory);

productRouter
  .route('/relatedProducts/:id')
  .get(productsController.findProductsByCategoryId);

productRouter.route('/topProducts').get(productsController.findBestProducts);

productRouter.use(authMiddleware.protect);
productRouter.use(authMiddleware.renew);

productRouter
  .route('/')
  .post(
    authMiddleware.restictTo('admin'),
    validation.createUserValidation,
    productsController.createProducts
  );

productRouter
  .route('/:id')
  .patch(validProduct, productsController.updateProduct)
  .delete(validProduct, productsController.deleteProduct);

module.exports = productRouter;
