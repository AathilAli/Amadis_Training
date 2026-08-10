const Student = require("../models/student.model");

async function createStudent(request, reply) {

    const { name, email } = request.body;

    const student = await Student.create({
        name: name,
        email: email
    });

    return {
        message: "Student created successfully",
        student: student
    };
}


async function getStudents(request, reply) {

    const students = await Student.findAll();

    return {
        students: students
    };
}


async function getStudentById(request, reply) {

    const { id } = request.params;

    const student = await Student.findByPk(id);

    return {
        student: student
    };
}

async function updateStudent(request, reply) {

    const { id } = request.params;

    const { name, email } = request.body;

    const student = await Student.findByPk(id);

    if (!student) {
        return reply.code(404).send({
            message: "Student not found"
        });
    }

    student.name = name;
    student.email = email;

    await student.save();

    return {
        message: "Student updated successfully",
        student: student
    };
}

async function deleteStudent(request, reply) {

    const { id } = request.params;

    const student = await Student.findByPk(id);

    if (!student) {
        return reply.code(404).send({
            message: "Student not found"
        });
    }

    await student.destroy();

    return {
        message: "Student deleted successfully"
    };
}



module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};