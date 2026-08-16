function authorizeRoles(...allowedRoles) {
  return async (request, reply) => {
    if (!request.user) {
      return reply.status(401).send({
        message: "Authentication required",
      });
    }

    if (!allowedRoles.includes(request.user.role)) {
      return reply.status(403).send({
        message: "Access denied",
      });
    }
  };
}

module.exports = authorizeRoles;