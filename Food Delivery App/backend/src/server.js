require("dotenv").config();

const Fastify = require("fastify");
const cors = require("@fastify/cors");
const sequelize = require("./config/database");

// Import models and relationships
require("./models");

const fastify = Fastify({
  logger: true,
});

// Enable CORS
fastify.register(cors, {
  origin: "http://localhost:5173",
});

// Test route
fastify.get("/", async () => {
  return {
    message: "Food Delivery API is running",
  };
});

// Restaurant routes
const restaurantRoutes = require("./routes/restaurantRoutes");

fastify.register(restaurantRoutes, {
  prefix: "/api",
});

// Menu routes
const menuRoutes = require("./routes/menuRoutes");

fastify.register(menuRoutes, {
  prefix: "/api",
});

// Authentication routes
const authRoutes = require("./routes/authRoutes");

fastify.register(authRoutes, {
  prefix: "/api",
});

// Order routes
const orderRoutes = require("./routes/orderRoutes");

fastify.register(orderRoutes, {
  prefix: "/api",
});

// Start server
const start = async () => {
  try {
    // Test PostgreSQL connection
    await sequelize.authenticate();

    console.log("PostgreSQL connected successfully");

    // Create/update database tables
    await sequelize.sync({
      alter: true,
    });

    console.log(
      "Database tables synchronized successfully",
    );

    // Start Fastify server
    await fastify.listen({
      port: process.env.PORT || 5000,
      host: "0.0.0.0",
    });

    console.log(
      `Server running on http://localhost:${
        process.env.PORT || 5000
      }`,
    );
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();