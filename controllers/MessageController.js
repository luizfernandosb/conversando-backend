const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Message = require("../models/Message");

class MessageController {
  constructor(wss) {
    this.wss = wss; // WebSocket server
  }

  // Método para criar uma nova mensagem
  async createMessage(req, res) {
    const { content } = req.body;
    const senderId = req.user.id;  // id do usuário autenticado

    try {
      console.log("Criando mensagem com o conteúdo:", content);

      // Salvando a mensagem no banco de dados
      const message = await Message.createMessage({ content, senderId }); // Verifique a implementação de createMessage
      const senderName = req.user.name;  // Supondo que req.user tenha o nome do usuário autenticado

      console.log("Mensagem criada com sucesso:", message);

      // Enviando a nova mensagem para todos os clientes conectados via WebSocket
      this.wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) { // Verificando se o WebSocket está aberto
          client.send(JSON.stringify({ message, senderName }));
        }
      });

      // Respondendo ao cliente que fez a requisição HTTP
      res.status(201).json({ message, senderName });
    } catch (error) {
      console.error("Erro ao criar mensagem:", error);
      res.status(500).json({ error: "Erro ao enviar mensagem" });
    }
  }

  // Método para buscar todas as mensagens
  async getAllMessages(req, res) {
    try {
      // Buscando todas as mensagens no banco de dados
      const messages = await Message.getAllMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Erro ao coletar mensagens:", error);
      res.status(500).json({ error: "Erro ao coletar mensagens" });
    }
  }
}

module.exports = MessageController;
