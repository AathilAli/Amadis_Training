const fastify = require("fastify")({
    logger: true
});

const emailRoutes = require("./routes/email.routes");

fastify.register(emailRoutes);

const studentRoutes = require("./routes/student.routes");

fastify.register(studentRoutes);

module.exports = fastify;