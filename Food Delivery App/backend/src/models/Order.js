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

    // Customer who placed the order
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Restaurant receiving the order
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Delivery staff assigned to this order
    deliveryStaffId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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