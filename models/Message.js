// models/Message.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Message {
  static async createMessage(data) {
    return await prisma.message.create({
      data,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  static async getAllMessages() {
    return await prisma.message.findMany({
      include: {
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}

module.exports = Message;
