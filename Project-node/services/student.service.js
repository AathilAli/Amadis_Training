const {
    findAll,
    findById
} = require("../models/student.model");


async function getAllStudents() {

    const students = findAll();

    return students;
}


async function getStudentById(id) {

    const student = findById(id);

    return student;
}


module.exports = {
    getAllStudents,
    getStudentById
};