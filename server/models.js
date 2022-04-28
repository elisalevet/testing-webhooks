
const Sequelize = require("sequelize");
const db = require("./database");

const Events = db.define("events", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  accountId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }, 
  }
});

module.exports = Events;
