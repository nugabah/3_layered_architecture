const express = require('express');
const ProductsController = require('../controllers/products.controller.js');
const authMiddleware = require('../middlewares/need-signin.middleware.js');
const routerProducts = express.Router();

const productsController = new ProductsController();

//상품 등록
routerProducts.post('/products', authMiddleware, productsController.createProduct);

//상품 목록 조회
routerProducts.get('/products', productsController.readAllProducts);

//상품 개별 조회
routerProducts.get('/products/:productId', productsController.readDetailProduct);

//상품 정보 수정
routerProducts.put('/products/:productId', authMiddleware, productsController.updateProduct);

//상품 삭제
routerProducts.delete('/products/:productId', authMiddleware, productsController.deleteProduct);

module.exports = routerProducts;
