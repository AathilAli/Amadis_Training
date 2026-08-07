const Fastify = require("fastify");

const fastify = Fastify({});

fastify.addHook("onRequest", async (request, reply) => {
    console.log("Request received");
});

fastify.get("/", async (request, reply) => {
    
    return {
        message: "Welcome",
    };
});

fastify.get("/students", async (request, reply) => {

    return {
        message: "Students"
    };
});




// onRequest Hook
fastify.addHook("onRequest", async (request, reply) => {
    console.log("1. Request received");
    // console.log(onRequest);
});

// // preHandler Hook
fastify.addHook("preHandler", async (request, reply) => {

    console.log("2. Checking login...");

    const token = request.headers.token;

    if (!token) {
        return reply.status(401).send({
            message: "Please login first"
        });
    }

    console.log("3. Login successful");
});


// // Route Handler
fastify.get("/profile", async (request, reply) => {

    console.log("4. Route Handler Executed");
    

    return {
        message: "Welcome to your profile"
    };

});




// onRequest Hook
fastify.addHook("onRequest", async (request, reply) => {
    console.log("Request received");
});

// POST Route with Schema Validation
fastify.post(
    "/students",

    {
        schema: {
            body: {
                type: "object",
                required: ["name", "age"],
                properties: {
                    name: { type: "string" },
                    age: { type: "number" }
                }
            }
        }
    },

    async (request, reply) => {

        return {
            message: "Student Created Successfully"
        };

    }
);

// GET Route
fastify.get("/", async (request, reply) => {

    return {
        message: "Welcome"
    };

});


fastify.listen({ port: 3001 });



