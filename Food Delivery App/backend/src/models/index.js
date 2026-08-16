const User = require("./User");
const Restaurant = require("./Restaurant");
const MenuItem = require("./MenuItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const DeliveryStatus = require("./DeliveryStatus");

// User → Orders
User.hasMany(Order, {
  foreignKey: "userId",
});

Order.belongsTo(User, {
  foreignKey: "userId",
});

// Restaurant → MenuItems
Restaurant.hasMany(MenuItem, {
  foreignKey: "restaurantId",
});

MenuItem.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

// Restaurant → Orders
Restaurant.hasMany(Order, {
  foreignKey: "restaurantId",
});

Order.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

// Order → OrderItems
Order.hasMany(OrderItem, {
  foreignKey: "orderId",
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
});

// MenuItem → OrderItems
MenuItem.hasMany(OrderItem, {
  foreignKey: "menuItemId",
});

OrderItem.belongsTo(MenuItem, {
  foreignKey: "menuItemId",
});

Order.hasMany(DeliveryStatus, {
  foreignKey: "orderId",
});

DeliveryStatus.belongsTo(Order, {
  foreignKey: "orderId",
});

module.exports = {
  User,
  Restaurant,
  MenuItem,
  Order,
  OrderItem,
  DeliveryStatus,
};