const studentController = require("../controllers/student.controller");

async function studentRoutes(fastify, options) {

    fastify.post(
        "/students",
        studentController.createStudent
    );

    fastify.get(
        "/students",
        studentController.getStudents
    );

    fastify.get(
        "/students/:id",
        studentController.getStudentById
    );

    fastify.put(
        "/students/:id",
        studentController.updateStudent
    );

    fastify.delete(
        "/students/:id",
        studentController.deleteStudent
    );

}

const emailController = require("../controllers/email.controller");



module.exports = studentRoutes;