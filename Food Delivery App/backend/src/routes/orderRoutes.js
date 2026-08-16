const { createOrder, getOrders, updateOrderStatus } = require("../controllers/orderController");
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


async function orderRoutes(fastify) {
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