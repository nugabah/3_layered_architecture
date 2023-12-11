const express = require('express');
const AuthController = require('../controllers/auth.controller.js');
const authController = new AuthController();
const authRouter = express.Router();

// 로그인
authRouter.post('/login', authController.logIn);

// 로그아웃
authRouter.get('/logout', authController.logOut);

module.exports = authRouter;
