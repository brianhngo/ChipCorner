const Sequelize = require("sequelize");
const db = require("../db");

const Orders = db.define("orders", {
  cart: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  isProcessed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  orderTotal: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Orders;
