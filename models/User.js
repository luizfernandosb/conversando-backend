const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User{
  static async createUser(data) {
    return await prisma.user.create({data})
  }

  static async getAllUsers() {
    return await prisma.user.findMany()
  }
}



module.exports = User;