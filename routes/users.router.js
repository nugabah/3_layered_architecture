const express = require('express');
const UsersController = require('../controllers/users.controller.js');
const usersController = new UsersController();
const usersRouter = express.Router();

// 회원가입
usersRouter.post('/users/signup', usersController.signUp);

// 로그인
usersRouter.post('/users/login', usersController.logIn);

module.exports = usersRouter;
