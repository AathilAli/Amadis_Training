const {
  getRestaurants,
} = require("../controllers/restaurantController");

async function restaurantRoutes(fastify) {
  fastify.get(
    "/restaurants",
    getRestaurants,
  );
}

module.exports = restaurantRoutes;