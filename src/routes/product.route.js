const express = require('express');
const productsController = require('../controllers/products.controller');
const Product = require('../models/products.model');
const { validProduct } = require('../middlewares/validProduct.middleware');

const mockProducts = [
  {
    name: 'producto 1',
    price: 30,
  },
  {
    name: 'producto 2',
    price: 40,
  },
  {
    name: 'producto 3',
    price: 50,
  },
];

const productRouter = express.Router();
productRouter
  .route('/:id')
  .patch(validProduct, productsController.updateProduct)
  .delete(validProduct, productsController.deleteProduct);

productRouter
  .route('/')
  .get(productsController.findProducts)
  .post(productsController.createProducts);

//productRouter.post("/bulk", async (req, res) => {
//  try {
//   console.log("asd");
//   const PostProductsDB = async (data) => {
//     Product.bulkCreate(data);
//    };
//    PostProductsDB(mockProducts);
//    res.status(200).send("product");
//  } catch (error) {
//    res.status(400).send({ error: error });
//  }
//});

module.exports = productRouter;
