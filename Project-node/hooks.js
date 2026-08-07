const Fastify = require("fastify");

const fastify = Fastify({});

// 1. onRequest (Runs for every request)
fastify.addHook("onRequest", async (request, reply) => {
    console.log("1. Request received");
});

// POST /students
fastify.post(
    "/students",
    {
        // 2. preValidation (Runs only for this route)
        preValidation: async (request, reply) => {
            console.log("2. preValidation");

            // Convert name to lowercase before validation
            if (request.body.name) {
                request.body.name = request.body.name.toLowerCase();
            }
        },

        // 3. Schema Validation
        schema: {
            body: {
                type: "object",
                required: ["name", "age"],
                properties: {
                    name: {
                        type: "string"
                    },
                    age: {
                        type: "number"
                    }
                }
            }
        },

        // 4. preHandler (Runs after validation)
        preHandler: async (request, reply) => {
            console.log("3. Checking Login");

            const token = request.headers.token;

            if (!token) {
                return reply.status(401).send({
                    message: "Please login first"
                });
            }

            console.log("4. Login Successful");
        }
    },

    // 5. Route Handler
    async (request, reply) => {

        console.log("5. Route Handler");

        return {
            message: "Student Created Successfully",
            student: request.body
        };

    }
);

// Simple GET route
fastify.get("/", async (request, reply) => {
    return {
        message: "Server Running"
    };
});

fastify.listen({ port: 3000 }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log("Server running at http://localhost:3000");
});