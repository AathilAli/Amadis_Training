const emailController = require("../controllers/email.controller");

async function emailRoutes(fastify, options) {

    fastify.get(
        "/",
        emailController.sendTestEmail
    );

}

module.exports = emailRoutes;