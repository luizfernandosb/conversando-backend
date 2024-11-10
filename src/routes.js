const express = require("express");
const UserController = require("../controllers/UserController");
const LoginController = require("../controllers/LoginController");
const MessageController = require("../controllers/MessageController");
const authenticateToken = require("../middleware/authMiddleware");

module.exports = (wss) => {
  const router = express.Router();
  const messageController = new MessageController(wss); // Crie a instância com wss aqui

  // Rota para usuário
  router.post("/users", UserController.createUser);
  router.get("/users", UserController.getAllUsers);
  router.get("/me", authenticateToken, (req, res) => {
    res.json({ user: req.user });
  });

  // Rota para login
  router.post("/login", LoginController.handleLogin);

  // Rotas para mensagens, incluindo os métodos bind
  router.post("/message", authenticateToken, messageController.createMessage.bind(messageController)); 
  router.get("/message",  messageController.getAllMessages.bind(messageController)); 

  return router;
};
