require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");



async function startServer() {

    try {

        await sequelize.authenticate();

        console.log("Database connected successfully");

        await app.listen({
            port: 3000
        });

        console.log("Server running on port 3000");

    } catch (error) {

        console.error("Unable to start server:", error);

        process.exit(1);
    }
}

startServer();