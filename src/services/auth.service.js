const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
const UsersRepository = require('../repositories/users.repository.js');
dotenv.config();
const secretKey = process.env.CUSTOMIZE_SECRET_KEY;
class AuthController {
  usersRepository = new UsersRepository();

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

module.exports = AuthController;
