const {
  getMenuItems,
} = require("../controllers/menuController");

async function menuRoutes(fastify) {
  fastify.get(
    "/restaurants/:restaurantId/menu",
    getMenuItems,
  );
}

module.exports = menuRoutes;