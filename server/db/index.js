//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Chips = require("./models/Chips");
const Orders = require("./models/Orders");

//associations could go here!
User.hasMany(Orders);
Orders.hasOne(User);

Orders.hasMany(Chips);
Chips.hasMany(Orders);

module.exports = {
  db,
  models: {
    User,
    Chips,
  },
};
