const { getStudents } = require("../controllers/student.controller");

async function studentRoutes(fastify, options) {

    fastify.get("/students", getStudents);

}

module.exports = studentRoutes;