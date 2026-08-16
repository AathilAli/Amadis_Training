const jwt = require("jsonwebtoken");

async function authenticate(request, reply) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({
        message: "Authentication required",
      });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return reply.status(401).send({
        message: "Invalid authorization format",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    request.user = decoded;
  } catch (error) {
    return reply.status(401).send({
      message: "Invalid or expired token",
    });
  }
}

module.exports = authenticate;