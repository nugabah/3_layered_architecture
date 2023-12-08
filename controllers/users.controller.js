const UsersService = require('../services/users.service.js');

class UsersController {
  usersService = new UsersService();

  signUp = async (req, res) => {
    try {
      const { email, password, passwordCheck, name } = req.body;

      const userInfo = await this.usersService.signUp(email, password, passwordCheck, name);
      return res.status(201).json({ data: userInfo });
    } catch (err) {
      res.status(400).json({ errorMessage: err.message });
    }
  };

  logIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await this.usersService.logIn(email, password);
      const token = user.token;
      const name = user.userName;
      let expires = new Date();
      expires.setMinutes(expires.getMinutes() + 720);
      res.cookie('authorization', `Bearer ${token}`, {
        expires: expires,
      });
      res.status(200).json({ message: '로그인 성공', name: name });
    } catch (err) {
      res.status(400).json({ errorMessage: err.message });
    }
  };
  logOut = async (req, res) => {
    try {
      res.clearCookie('authorization');
      res.status(200).json({ message: '로그아웃 성공' });
    } catch (err) {
      res.status(400).json({ errorMessage: err.message });
    }
  };
}

module.exports = UsersController;
