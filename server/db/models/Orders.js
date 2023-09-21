const Sequelize = require('sequelize');
const db = require('../db');

const Orders = db.define('orders', {
  orderInfo: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  userInfo: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Orders;
