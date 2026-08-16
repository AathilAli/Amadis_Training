const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "Placed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
      ),
      defaultValue: "Placed",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  },
);

module.exports = Order;