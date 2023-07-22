const Sequelize = require("sequelize");
const db = require("../db");

// title, description, size, baked or not baked, ingredients, nutritional facts
const Chips = db.define("chips", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING(700),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  brand: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  size: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
    },
  },
  baked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  ingredients: {
    type: Sequelize.STRING(700),
    validate: {
      notEmpty: true,
    },
  },
  nutritional: {
    type: Sequelize.TEXT,
    defaultValue: "https://qph.cf2.quoracdn.net/main-qimg-602f1c2b1c4d7b1fcda15a581d2b51b1-pjlq",
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://previews.123rf.com/images/fernati2007/fernati20071905/fernati2007190500042/124428408-isolated-chips-group-of-potato-chips-isolated-on-white-background.jpg",
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

module.exports = Chips;
