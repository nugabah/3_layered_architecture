const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
const UsersRepository = require('../repositories/users.repository.js');
dotenv.config();
const secretKey = process.env.CUSTOMIZE_SECRET_KEY;
class UsersController {
  usersRepository = new UsersRepository();
  signUp = async (email, password, passwordCheck, name) => {
    if (!Object.keys({ email, password, passwordCheck, name }).length) {
      throw new Error('데이터 형식이 올바르지 않습니다.');
    }
    if (email.split('@').length !== 2) {
      throw new Error('이메일 형식이 아닙니다.');
    }
    if (password.length < 6) {
      throw new Error('비밀번호는 6자 이상입니다.');
    }
    if (password !== passwordCheck) {
      throw new Error('확인 비밀번호와 다릅니다.');
    }

    const isExistUser = await this.usersRepository.findExistUser(email);

    if (isExistUser) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const user = await this.usersRepository.createUser(email, hashedPassword, name);
    const userWithoutPassword = {
      userId: user.userId,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userWithoutPassword;
  };

  logIn = async (email, password) => {
    if (!Object.keys({ email, password }).length) {
      throw new Error('데이터 형식이 올바르지 않습니다.');
    }
    const user = await this.usersRepository.findExistUser(email);
    if (!user) {
      throw new Error('존재하지 않는 이메일입니다.');
    }
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (user.password !== hashedPassword) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const token = jwt.sign(
      {
        userId: user.userId,
      },
      secretKey,
      { expiresIn: '12h' },
    );
    const userName = user.name;
    return { userName, token };
  };
}

module.exports = UsersController;
