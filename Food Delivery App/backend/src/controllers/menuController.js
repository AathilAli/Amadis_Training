const { MenuItem } = require("../models");

async function getMenuItems(request, reply) {
  try {
    const { restaurantId } = request.params;

    const menuItems = await MenuItem.findAll({
      where: {
        restaurantId: Number(restaurantId),
      },
    });

    return reply.send(menuItems);
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      message: "Failed to fetch menu items",
    });
  }
}

module.exports = {
  getMenuItems,
};