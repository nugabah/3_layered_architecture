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
}

module.exports = UsersController;
