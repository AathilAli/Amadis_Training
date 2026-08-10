const Fastify = require("fastify");

const fastify = Fastify({
    logger: true
});

const studentRoutes = require("./routes/student.routes");

fastify.register(studentRoutes);

fastify.listen({
    port: 3001
});