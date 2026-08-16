const {
  register,
  login,
} = require("../controllers/authController");

async function authRoutes(fastify) {
  fastify.post("/auth/register", register);
  fastify.post("/auth/login", login);
}

module.exports = authRoutes;