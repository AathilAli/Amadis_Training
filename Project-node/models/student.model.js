const students = [
    {
        id: 1,
        name: "Aathil",
        age: 22
    },
    {
        id: 2,
        name: "Rahul",
        age: 21
    },
    {
        id: 3,
        name: "Arun",
        age: 23
    }
];


function findAll() {

    return students;
}


function findById(id) {

    return students.find(student => student.id === id);
}


module.exports = {
    findAll,
    findById
};