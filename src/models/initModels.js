const Orders = require('./orders.model');
const Products = require('./products.model');
const Categories = require('./categories.model');

const initModel = () => {
  Orders.belongsToMany(Products, { through: 'order_product' });
  Products.belongsToMany(Orders, { through: 'order_product' });
  Categories.hasMany(Products);
  Products.belongsTo(Categories);
};

module.exports = initModel;
