const prisma = require('../utils/prisma/index.js');

class UsersRepository {
  findExistUser = async email => {
    const isExistUser = await prisma.Users.findUnique({ where: { email: email } });
    await prisma.$disconnect();
    return isExistUser;
  };

  createUser = async (email, hashedPassword, name) => {
    const createdUser = await prisma.Users.create({ data: { email, password: hashedPassword, name } });
    await prisma.$disconnect();
    return createdUser;
  };
}

module.exports = UsersRepository;
