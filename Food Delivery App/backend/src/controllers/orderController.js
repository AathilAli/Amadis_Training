const sequelize = require("../config/database");

const {
  Order,
  OrderItem,
  MenuItem,
  DeliveryStatus,
  Restaurant,
  User,
} = require("../models");

// ==========================================
// CUSTOMER - CREATE ORDER
// ==========================================

async function createOrder(request, reply) {
  const transaction = await sequelize.transaction();

  try {
    const userId = request.user.id;
    const { restaurantId, items } = request.body;

    if (!restaurantId || !items || items.length === 0) {
      await transaction.rollback();

      return reply.status(400).send({
        message: "Restaurant and items are required",
      });
    }

    let total = 0;

    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findOne({
        where: {
          id: item.menuItemId,
          restaurantId,
        },
        transaction,
      });

      if (!menuItem) {
        await transaction.rollback();

        return reply.status(404).send({
          message: `Menu item ${item.menuItemId} not found`,
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        await transaction.rollback();

        return reply.status(400).send({
          message: "Quantity must be a positive integer",
        });
      }

      const itemTotal = Number(menuItem.price) * quantity;

      total += itemTotal;

      orderItems.push({
        menuItemId: menuItem.id,
        quantity,
        price: menuItem.price,
      });
    }

    const order = await Order.create(
      {
        userId,
        restaurantId,
        total,
        status: "Placed",
        deliveryStaffId: null,
      },
      {
        transaction,
      },
    );

    for (const item of orderItems) {
      await OrderItem.create(
        {
          orderId: order.id,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: item.price,
        },
        {
          transaction,
        },
      );
    }

    await DeliveryStatus.create(
      {
        orderId: order.id,
        status: "Placed",
        updatedBy: userId,
      },
      {
        transaction,
      },
    );

    await transaction.commit();

    return reply.status(201).send({
      message: "Order placed successfully",
      order: {
        id: order.id,
        userId: order.userId,
        restaurantId: order.restaurantId,
        total: order.total,
        status: order.status,
        deliveryStaffId: order.deliveryStaffId,
      },
    });
  } catch (error) {
    await transaction.rollback();

    request.log.error(error);

    return reply.status(500).send({
      message: "Failed to place order",
    });
  }
}

// ==========================================
// CUSTOMER - GET OWN ORDERS
// ==========================================

async function getOrders(request, reply) {
  try {
    const userId = request.user.id;

    const orders = await Order.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: OrderItem,
          include: [MenuItem],
        },
        {
          model: DeliveryStatus,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return reply.send(orders);
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      message: "Failed to fetch orders",
    });
  }
}

// ==========================================
// OWNER - GET RESTAURANT ORDERS
// ==========================================

async function getOwnerOrders(request, reply) {
  try {
    const ownerId = request.user.id;

    // Find restaurants owned by this owner
    const restaurants = await Restaurant.findAll({
      where: {
        ownerId,
      },
      attributes: ["id", "name"],
    });

    if (restaurants.length === 0) {
      return reply.send([]);
    }

    const restaurantIds = restaurants.map(
      (restaurant) => restaurant.id,
    );

    // Get orders belonging to owner's restaurants
    const orders = await Order.findAll({
      where: {
        restaurantId: restaurantIds,
      },
      include: [
        {
          model: OrderItem,
          include: [MenuItem],
        },
        {
          model: DeliveryStatus,
        },
        {
          model: Restaurant,
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "customer",
          attributes: ["id", "name", "email"],
        },
        {
          model: User,
          as: "deliveryStaff",
          attributes: ["id", "name", "email", "role"],
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return reply.send(orders);
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      message: "Failed to fetch owner orders",
    });
  }
}

// ==========================================
// OWNER - ASSIGN DELIVERY STAFF
// ==========================================

async function assignDeliveryStaff(request, reply) {
  const transaction = await sequelize.transaction();

  try {
    const ownerId = request.user.id;
    const { orderId } = request.params;
    const { deliveryStaffId } = request.body;

    if (!deliveryStaffId) {
      await transaction.rollback();

      return reply.status(400).send({
        message: "Delivery staff ID is required",
      });
    }

    // Check delivery staff exists and has correct role
    const deliveryStaff = await User.findOne({
      where: {
        id: deliveryStaffId,
        role: "delivery_staff",
      },
      transaction,
    });

    if (!deliveryStaff) {
      await transaction.rollback();

      return reply.status(404).send({
        message: "Delivery staff not found",
      });
    }

    // Find the order
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: Restaurant,
          attributes: ["id", "name", "ownerId"],
        },
      ],
      transaction,
    });

    if (!order) {
      await transaction.rollback();

      return reply.status(404).send({
        message: "Order not found",
      });
    }

    // Make sure this order belongs to the logged-in owner's restaurant
    if (
      !order.Restaurant ||
      order.Restaurant.ownerId !== ownerId
    ) {
      await transaction.rollback();

      return reply.status(403).send({
        message: "You can only assign delivery staff to your own restaurant orders",
      });
    }

    // Assign delivery staff
    order.deliveryStaffId = deliveryStaffId;

    await order.save({
      transaction,
    });

    await transaction.commit();

    return reply.send({
      message: "Delivery staff assigned successfully",
      order: {
        id: order.id,
        restaurantId: order.restaurantId,
        deliveryStaffId: order.deliveryStaffId,
        status: order.status,
      },
    });
  } catch (error) {
    await transaction.rollback();

    request.log.error(error);

    return reply.status(500).send({
      message: "Failed to assign delivery staff",
    });
  }
}

// ==========================================
// DELIVERY STAFF - GET ASSIGNED ORDERS
// ==========================================

async function getDeliveryOrders(request, reply) {
  try {
    const deliveryStaffId = request.user.id;

    const orders = await Order.findAll({
      where: {
        deliveryStaffId,
      },
      include: [
        {
          model: OrderItem,
          include: [MenuItem],
        },
        {
          model: DeliveryStatus,
        },
        {
          model: Restaurant,
          attributes: ["id", "name", "cuisine"],
        },
        {
          model: User,
          as: "customer",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return reply.send(orders);
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      message: "Failed to fetch delivery orders",
    });
  }
}

// ==========================================
// OWNER / DELIVERY STAFF - UPDATE STATUS
// ==========================================

async function updateOrderStatus(request, reply) {
  const transaction = await sequelize.transaction();

  try {
    const userId = request.user.id;
    const userRole = request.user.role;

    const { orderId } = request.params;
    const { status } = request.body;

    const allowedStatuses = [
      "Placed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      await transaction.rollback();

      return reply.status(400).send({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: Restaurant,
          attributes: ["id", "name", "ownerId"],
        },
      ],
      transaction,
    });

    if (!order) {
      await transaction.rollback();

      return reply.status(404).send({
        message: "Order not found",
      });
    }

    // ==========================================
    // OWNER PERMISSION
    // ==========================================

    if (userRole === "restaurant_owner") {
      // Owner can only update orders from their own restaurant
      if (
        !order.Restaurant ||
        order.Restaurant.ownerId !== userId
      ) {
        await transaction.rollback();

        return reply.status(403).send({
          message: "You can only manage orders from your own restaurant",
        });
      }

      // Owner handles restaurant preparation
      if (status !== "Preparing") {
        await transaction.rollback();

        return reply.status(403).send({
          message:
            "Restaurant owner can only change the order to Preparing",
        });
      }
    }

    // ==========================================
    // DELIVERY STAFF PERMISSION
    // ==========================================

    if (userRole === "delivery_staff") {
      // Delivery staff can only update their assigned orders
      if (order.deliveryStaffId !== userId) {
        await transaction.rollback();

        return reply.status(403).send({
          message: "This order is not assigned to you",
        });
      }

      // Delivery staff handles delivery statuses
      if (
        status !== "Out for Delivery" &&
        status !== "Delivered"
      ) {
        await transaction.rollback();

        return reply.status(403).send({
          message:
            "Delivery staff can only change status to Out for Delivery or Delivered",
        });
      }
    }

    order.status = status;

    await order.save({
      transaction,
    });

    await DeliveryStatus.create(
      {
        orderId: order.id,
        status,
        updatedBy: userId,
      },
      {
        transaction,
      },
    );

    await transaction.commit();

    return reply.send({
      message: "Order status updated successfully",
      order: {
        id: order.id,
        status: order.status,
        deliveryStaffId: order.deliveryStaffId,
      },
    });
  } catch (error) {
    await transaction.rollback();

    request.log.error(error);

    return reply.status(500).send({
      message: "Failed to update order status",
    });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOwnerOrders,
  assignDeliveryStaff,
  getDeliveryOrders,
  updateOrderStatus,
};