const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
// const { UsersService } = require('../services/users.service.js');
dotenv.config();
const secretKey = process.env.CUSTOMIZE_SECRET_KEY;

class UsersController {
  // usersService = new UsersService();
  prisma = new PrismaClient();

  signUp = async (req, res) => {
    try {
      const { email, password, passwordCheck, name } = req.body;

      if (!Object.keys(req.body).length) {
        return res.status(409).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
      }
      if (email.split('@').length !== 2) {
        return res.status(409).json({ message: '이메일 형식이 아닙니다.' });
      }
      if (password.length < 6) {
        return res.status(409).json({ message: '비밀번호는 6자 이상입니다.' });
      }
      if (password !== passwordCheck) {
        return res.status(409).json({ message: '확인 비밀번호와 다릅니다.' });
      }

      const isExistUser = await this.prisma.Users.findUnique({ where: { email: email } });

      if (isExistUser) {
        return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
      }

      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
      const user = await this.prisma.Users.create({ data: { email, password: hashedPassword, name } });
      const userWithoutPassword = {
        userId: user.userId,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      await this.prisma.$disconnect();
      return res.status(201).json({ data: userWithoutPassword });
    } catch (err) {
      res.status(400).json({ errorMessage: '에러가 발생했습니다.', err });
    }
  };

  logIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.prisma.Users.findUnique({ where: { email: email } });
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
      if (!Object.keys(req.body).length) {
        return res.status(409).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
      }
      if (!user) {
        return res.status(401).json({ message: '존재하지 않는 이메일입니다.' });
      } else if (user.password !== hashedPassword) {
        return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
      }
      await this.prisma.$disconnect();

      const token = jwt.sign(
        {
          userId: user.userId,
        },
        secretKey,
        { expiresIn: '12h' },
      );
      let expires = new Date();
      expires.setMinutes(expires.getMinutes() + 720);
      res.cookie('authorization', `Bearer ${token}`, {
        expires: expires,
      });
      return res.status(200).json({ message: '로그인 성공' });
    } catch (err) {
      res.status(400).json({ errorMessage: '에러가 발생했습니다.', err });
    }
  };
}

module.exports = UsersController;
