const { Router } = require('express');
const categoryRouter = require('./category.route');
const orderRouter = require('./order.route');
const userRouter = require('./user.route');
const productRouter = require('./product.route');
const bestProductRouter = require('./bestProduct.route');

const router = Router();

router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);
router.use('/admin', userRouter);
router.use('/products', productRouter);
router.use('/bestProduct', bestProductRouter);

module.exports = router;
