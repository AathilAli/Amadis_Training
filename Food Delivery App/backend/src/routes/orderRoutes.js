const {
  createOrder,
  getOrders,
  getOwnerOrders,
  assignDeliveryStaff,
  getDeliveryOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

async function orderRoutes(fastify) {
  // ==========================================
  // CUSTOMER
  // ==========================================

  // Place an order
  fastify.post(
    "/orders",
    {
      preHandler: [
        authenticate,
        authorizeRoles("customer"),
      ],
    },
    createOrder,
  );

  // Customer sees their own orders
  fastify.get(
    "/orders",
    {
      preHandler: [
        authenticate,
        authorizeRoles("customer"),
      ],
    },
    getOrders,
  );

  // ==========================================
  // RESTAURANT OWNER
  // ==========================================

  // Owner sees orders from their restaurant
  fastify.get(
    "/owner/orders",
    {
      preHandler: [
        authenticate,
        authorizeRoles("restaurant_owner"),
      ],
    },
    getOwnerOrders,
  );

  // Owner assigns delivery staff to an order
  fastify.patch(
    "/orders/:orderId/assign-delivery",
    {
      preHandler: [
        authenticate,
        authorizeRoles("restaurant_owner"),
      ],
    },
    assignDeliveryStaff,
  );

  // ==========================================
  // DELIVERY STAFF
  // ==========================================

  // Delivery staff sees their assigned orders
  fastify.get(
    "/delivery/orders",
    {
      preHandler: [
        authenticate,
        authorizeRoles("delivery_staff"),
      ],
    },
    getDeliveryOrders,
  );

  // ==========================================
  // OWNER + DELIVERY STAFF
  // ==========================================

  // Update order status
  fastify.patch(
    "/orders/:orderId/status",
    {
      preHandler: [
        authenticate,
        authorizeRoles(
          "restaurant_owner",
          "delivery_staff",
        ),
      ],
    },
    updateOrderStatus,
  );
}

module.exports = orderRoutes;