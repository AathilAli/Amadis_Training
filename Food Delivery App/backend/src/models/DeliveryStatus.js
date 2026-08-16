const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DeliveryStatus = sequelize.define(
  "DeliveryStatus",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "Placed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
      ),
      allowNull: false,
    },

    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "delivery_statuses",
    timestamps: true,
  },
);

module.exports = DeliveryStatus;