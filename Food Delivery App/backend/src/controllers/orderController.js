const sequelize = require("../config/database");
const {
  Order,
  OrderItem,
  MenuItem,
  DeliveryStatus,
} = require("../models");

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

      const itemTotal =
        Number(menuItem.price) * quantity;

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

async function updateOrderStatus(request, reply) {
  const transaction = await sequelize.transaction();

  try {
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
      transaction,
    });

    if (!order) {
      await transaction.rollback();

      return reply.status(404).send({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save({
      transaction,
    });

    await DeliveryStatus.create(
      {
        orderId: order.id,
        status,
        updatedBy: request.user.id,
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
  updateOrderStatus,
};