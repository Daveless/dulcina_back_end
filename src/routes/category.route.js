const express = require('express');
const categoriesController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validation = require('../middlewares/validation.middleware');

const categoryRouter = express.Router();

categoryRouter.route('/').get(categoriesController.findCategories);
categoryRouter.route('/:id').get(categoriesController.getCategory);

categoryRouter.use(authMiddleware.protect);
categoryRouter.use(authMiddleware.renew);

categoryRouter
  .route('/')
  .post(
    authMiddleware.restictTo('admin'),
    categoriesController.createCategories
  );

categoryRouter.route('/:id').delete(categoriesController.deleteCategory);

module.exports = categoryRouter;
