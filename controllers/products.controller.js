const ProductsService = require('../services/products.service.js');

class ProductsController {
  productsService = new ProductsService();

  createProduct = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { title, content } = req.body;
      const createdProduct = await this.productsService.createProduct(userId, title, content);
      return res.status(201).json({ Message: '게시글이 등록되었습니다.', createdProduct });
    } catch (err) {
      res.status(400).json({ errorMessage: '에러가 발생했습니다.', err });
    }
  };

  readAllProducts = async (req, res) => {
    try {
      const showAllProducts = await this.productsService.findAllProducts();
      return res.status(200).json({ data: showAllProducts });
    } catch (err) {
      res.status(400).json({ errorMessage: '에러가 발생했습니다.', err });
    }
  };

  readDetailProduct = async (req, res) => {
    try {
      const { productId } = req.params;

      const showDetailProducts = await this.productsService.findDetailProduct(productId);
      return res.status(200).json({ data: showDetailProducts });
    } catch (err) {
      res.status(400).json({ errorMessage: '에러가 발생했습니다.', err });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { userId } = res.locals.user;
      const { title, content, status } = req.body;

      const updatedProduct = await this.productsService.updateProduct(productId, userId, title, content, status);
      return res.status(201).json({ data: '게시글이 수정되었습니다.', updatedProduct });
    } catch (err) {
      res.status(400).json({ errorMessage: '에러가 발생했습니다.', err });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { userId } = res.locals.user;

      const deletedProduct = await this.productsService.deleteProduct(productId, userId);
      return res.status(200).json({ data: '게시글이 삭제되었습니다.', deletedProduct });
    } catch (err) {
      res.status(400).json({ errorMessage: '에러가 발생했습니다.', err });
    }
  };
}

module.exports = ProductsController;
