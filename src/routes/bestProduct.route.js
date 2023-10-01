const express = require('express');
const productsController = require('../controllers/products.controller');
const { validProduct } = require('../middlewares/validProduct.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const validation = require('../middlewares/validation.middleware');

const productRouter = express.Router();

productRouter.route('/').get(productsController.findBestProducts);

module.exports = productRouter;
