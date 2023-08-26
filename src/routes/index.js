const { Router } = require('express');
const categoryRouter = require('./category.route');
const orderRouter = require('./order.route');
const userRouter = require('./user.route');
const productRouter = require('./product.route');


const router = Router();

router.use("/categories",categoryRouter)
router.use("/orders", orderRouter)
router.use("/users", userRouter)
router.use("/products", productRouter)

module.exports = router;