const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Product = db.define('products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  times_sold: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  highlight_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: 'none',
  },
});

module.exports = Product;
