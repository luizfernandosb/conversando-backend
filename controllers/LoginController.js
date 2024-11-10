// controllers/LoginController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config();

const JWT_SECRET = process.env.SECRET_TOKEN;

const UserLogin = require("../models/Login");

class LoginController {
  static async handleLogin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserLogin.handleLogin(email);

      if (user && (await bcrypt.compare(password, user.password))) {
        // Incluindo `id` e `name` no payload do token
        const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET);
        return res.status(200).json({ message: "Login successful", token });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = LoginController;
