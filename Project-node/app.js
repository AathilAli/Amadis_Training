const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Someone visited the website");
  console.log(req.url);

  res.end("Welcome Aathil!");
});

server.listen(3000, () => {
  console.log("Server started");
});


const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.end("Home Page");
    }

    else if (req.url === "/about") {
        res.end("About Page");
    }

    else {
        res.end("Page Not Found");
    }

});

server.listen(3000);


//FASTIFY

const Fastify = require("fastify");

const app = Fastify({});

app.get("/", (request, reply) => {
    return "Hello Fastify!";
});

app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server running at ${address}`);
});

app.get("/about", (request, reply) => {
            console.log("About page visited");
            console.log(request.url);
            console.log(request.method);
            console.log(reply.statusCode)
        return "About Page";

});

app.get("/students/:id",(request, reply) => {
    console.log(request.params);
    return request.params.id;
})

app.get("/students/:id", (request, reply) => {
    return `Student ID: ${request.params.id}`;
});

app.get("/students", (request, reply) => {
    console.log("this is end");
    

    return request.body;
});


// | Route Parameter                        | Query Parameter                  |
// | -------------------------------------- | -------------------------------- |
// | `/students/10`                         | `/students?id=10`                |
// | `request.params.id`                    | `request.query.id`               |
// | Usually identifies a specific resource | Usually filters or modifies data |


// app.post('/students',(request, reply) => {
//     console.log(request.body);
//     return request.body;
// })


app.post("/students", (request, reply) => {

    const { name, age } = request.body;

    return {
        message: "Student Added Successfully",
        student: {
            name,
            age
        }
    };
  console.log(request.params);
    console.log(request.query);
    console.log(request.body);

});

app.get("/students/:id", (request, reply) => {
    console.log(request.params);
    console.log(request.query);
    console.log(request.body);

    return "Done";
});


app.get("/students", (request, reply) => {
    return ["Aathil", "Ali", "AbdulRahman"];
});

app.post("/students", (request, reply) => {

    const { name } = request.body;

    if (!name) {
        return reply.code(400).send({
            message: "Name is required"
        });
    }

    return {
        message: "Success"
    };

});



app.get("/students", (request, reply) => {
    return request.body;
}
)

app.get("/students/:id", (request, reply) => {

    const { id } = request.params;

    return {
        message: "Student Found",
        studentId: id
    };

});

app.post("/students", (request, reply) => {

    const { name, age } = request.body;

    return {
        message: "Student Created Successfully",
        student: {
            name,
            age
        }
    };

});



const students = [
    {
        id: 1,
        name: "Aathil",
        age: 22
    },
    {
        id: 2,
        name: "Ali",
        age: 21
    }
];

// GET
app.get("/students", (request, reply) => {
    return students;
});

// POST
app.post("/students", (request, reply) => {

    const { id, name, age } = request.body;

    students.push({
        id,
        name,
        age
    });

    return {
        message: "Student Added Successfully",
        students
    };
});

// PUT
app.put("/students/:id", (request, reply) => {

    const { id } = request.params;
    const { name, age } = request.body;

    const student = students.find(student => student.id == id);

    if (!student) {
        return reply.code(404).send({
            message: "Student Not Found"
        });
    }

    student.name = name;
    student.age = age;

    return {
        message: "Student Updated Successfully",
        student
    };
});

// DELETE
app.delete("/students/:id", (request, reply) => {

    const { id } = request.params;

    const index = students.findIndex(student => student.id == id);

    if (index === -1) {
        return reply.code(404).send({
            message: "Student Not Found"
        });
    }

    students.splice(index, 1);

    return {
        message: "Student Deleted Successfully",
        students
    };
});



