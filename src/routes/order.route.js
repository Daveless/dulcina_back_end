const express = require("express");
const ordersController = require("../controllers/orders.controller");
const { validProduct } = require("../middlewares/validProduct.middleware");

const productRouter = express.Router();

productRouter
  .route("/:id")
  .patch(ordersController.updateOrder)
  .delete(ordersController.deleteProduct);

productRouter
  .route("/")
  .post(ordersController.createOrder)
  .get(ordersController.findOrders);

module.exports = productRouter;
