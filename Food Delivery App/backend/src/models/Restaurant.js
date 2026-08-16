const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Restaurant = sequelize.define(
  "Restaurant",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cuisine: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
    },

    deliveryTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "restaurants",
    timestamps: true,
  },
);

module.exports = Restaurant;