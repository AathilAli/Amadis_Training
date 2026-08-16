const bcrypt = require("bcrypt");
const { User } = require("../models");

async function register(request, reply) {
  try {
    const { name, email, password, role } = request.body;

    if (!name || !email || !password) {
      return reply.status(400).send({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return reply.status(409).send({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    return reply.status(201).send({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      message: "Registration failed",
    });
  }
}

const jwt = require("jsonwebtoken");

async function login(request, reply) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return reply.status(400).send({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return reply.status(401).send({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      return reply.status(401).send({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return reply.send({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      message: "Login failed",
    });
  }
}

module.exports = {
  register,login,
};