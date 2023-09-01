const Orders = require('./orders.model');
const Products = require('./products.model');

const initModel = () => {
  Orders.belongsToMany(Products, { through: 'order_product' });
  Products.belongsToMany(Orders, { through: 'order_product' });
};

module.exports = initModel;
