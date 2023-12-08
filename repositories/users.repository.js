const { PrismaClient } = require('@prisma/client');

class UsersRepository {
  prisma = new PrismaClient();
  findExistUser = async email => {
    const isExistUser = await this.prisma.Users.findUnique({ where: { email: email } });
    await this.prisma.$disconnect();
    return isExistUser;
  };

  createUser = async (email, hashedPassword, name) => {
    const createdUser = await this.prisma.Users.create({ data: { email, password: hashedPassword, name } });
    await this.prisma.$disconnect();
    return createdUser;
  };
}

module.exports = UsersRepository;
