const express = require('express');
const authController = require('../controllers/auth.contollers');
const authMiddleware = require('../middlewares/auth.middleware');

const userRouter = express.Router();

userRouter.route('/login').post(authController.login);

userRouter.use(authMiddleware.protect);
userRouter.use(authMiddleware.renew);

userRouter
  .route('/')
  .post(authMiddleware.restictTo('admin'), authController.signup);

module.exports = userRouter;
