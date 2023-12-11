const AuthService = require('../services/auth.service.js');

class AuthController {
  authService = new AuthService();

  logIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await this.authService.logIn(email, password);
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

module.exports = AuthController;
