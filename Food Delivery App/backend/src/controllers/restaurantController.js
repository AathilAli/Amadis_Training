const { Restaurant } = require("../models");

async function getRestaurants(request, reply) {
  try {
    const restaurants = await Restaurant.findAll();

    return reply.send(restaurants);
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      message: "Failed to fetch restaurants",
    });
  }
}

async function assignOwner(request, reply) {
  try {
    const { restaurantId } = request.params;
    const { ownerId } = request.body;

    if (!ownerId) {
      return reply.status(400).send({
        message: "Owner ID is required",
      });
    }

    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      return reply.status(404).send({
        message: "Restaurant not found",
      });
    }

    restaurant.ownerId = ownerId;

    await restaurant.save();

    return reply.send({
      message: "Owner assigned successfully",
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        ownerId: restaurant.ownerId,
      },
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      message: "Failed to assign owner",
    });
  }
}

module.exports = {
  getRestaurants,
  assignOwner,
};