const { PrismaClient } = require('@prisma/client');

class UsersRepository {
  prisma = new PrismaClient();
}

module.exports = UsersRepository;
