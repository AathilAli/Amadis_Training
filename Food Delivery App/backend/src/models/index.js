const User = require("./User");
const Restaurant = require("./Restaurant");
const MenuItem = require("./MenuItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const DeliveryStatus = require("./DeliveryStatus");

// ==========================================
// USER → ORDERS (CUSTOMER)
// ==========================================

User.hasMany(Order, {
  foreignKey: "userId",
  as: "customerOrders",
});

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "customer",
});

// ==========================================
// USER → RESTAURANTS (RESTAURANT OWNER)
// ==========================================

User.hasMany(Restaurant, {
  foreignKey: "ownerId",
  as: "restaurants",
});

Restaurant.belongsTo(User, {
  foreignKey: "ownerId",
  as: "owner",
});

// ==========================================
// USER → ORDERS (DELIVERY STAFF)
// ==========================================

User.hasMany(Order, {
  foreignKey: "deliveryStaffId",
  as: "deliveryOrders",
});

Order.belongsTo(User, {
  foreignKey: "deliveryStaffId",
  as: "deliveryStaff",
});

// ==========================================
// RESTAURANT → MENU ITEMS
// ==========================================

Restaurant.hasMany(MenuItem, {
  foreignKey: "restaurantId",
});

MenuItem.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

// ==========================================
// RESTAURANT → ORDERS
// ==========================================

Restaurant.hasMany(Order, {
  foreignKey: "restaurantId",
});

Order.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

// ==========================================
// ORDER → ORDER ITEMS
// ==========================================

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
});

// ==========================================
// MENU ITEM → ORDER ITEMS
// ==========================================

MenuItem.hasMany(OrderItem, {
  foreignKey: "menuItemId",
});

OrderItem.belongsTo(MenuItem, {
  foreignKey: "menuItemId",
});

// ==========================================
// ORDER → DELIVERY STATUS HISTORY
// ==========================================

Order.hasMany(DeliveryStatus, {
  foreignKey: "orderId",
});

DeliveryStatus.belongsTo(Order, {
  foreignKey: "orderId",
});

// ==========================================
// EXPORT MODELS
// ==========================================

module.exports = {
  User,
  Restaurant,
  MenuItem,
  Order,
  OrderItem,
  DeliveryStatus,
};