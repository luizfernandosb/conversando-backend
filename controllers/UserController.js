const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

const User = require("../models/User");

class UserController {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    const saltRounds = 10;

    try {
      // Gerando o hash da senha com bcrypt
      const hashedPassword = await bcrypt.hash(password, saltRounds);

    

      // Criando o usuário com a senha hash
      const user = await User.createUser({
        name,
        email,
        password: hashedPassword,
      });

      console.log("Usuário criado com sucesso");
      res.status(201).json({ message: "Usuario criado com sucesso.", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      console.log(users);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
}

module.exports = new UserController();
