const express = require('express');
const UsersController = require('../controllers/users.controller.js');
const usersController = new UsersController();
const usersRouter = express.Router();

// 회원가입
usersRouter.post('/signup', usersController.signUp);

module.exports = usersRouter;
