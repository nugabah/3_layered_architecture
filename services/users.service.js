const { UsersRepository } = require('../repositories/users.repository.js');

class UsersController {
  usersRepository = new UsersRepository();
}

module.exports = UsersController;
