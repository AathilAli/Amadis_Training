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

module.exports = {
  getRestaurants,
};