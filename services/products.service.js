const ProductsRepository = require('../repositories/products.repository.js');

class ProductsService {
  productsRepository = new ProductsRepository();

  createProduct = async (userId, title, content) => {
    if (!Object.keys({ title, content }).length) {
      return res.status(409).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }
    const createProduct = await this.productsRepository.createProduct(userId, title, content);

    return createProduct;
  };

  findAllProducts = async () => {
    const allProducts = await this.productsRepository.readAllProducts();
    return allProducts;
  };

  findDetailProduct = async productId => {
    const DetailProduct = await this.productsRepository.readDetailProduct(productId);
    if (!DetailProduct) {
      return res.status(404).json({ message: '상품 조회에 실패하였습니다.' });
    }
    return DetailProduct;
  };

  updateProduct = async (productId, userId, title, content, status) => {
    if (!Object.keys({ title, content, status }).length) {
      return res.status(409).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }
    if (status !== 'FOR_SALE' && status !== 'SOLD_OUT') {
      return res.status(409).json({ message: '판매 중이거나 판매 완료여야 합니다.' });
    }
    const product = await this.productsRepository.findPIdProduct(productId);
    if (!product) {
      return res.status(404).json({ message: '상품 조회에 실패하였습니다.' });
    } else if (product.userId !== userId) {
      return res.status(401).json({ message: '권한이 없습니다.' });
    }
    const updatedProduct = await this.productsRepository.updateProduct(title, content, status, productId);
    return updatedProduct;
  };

  deleteProduct = async (productId, userId) => {
    const product = await this.productsRepository.findPIdProduct(productId);

    if (!product) {
      return res.status(404).json({ message: '상품 조회에 실패하였습니다.' });
    } else if (product.userId !== userId) {
      return res.status(401).json({ message: '권한이 없습니다.' });
    }

    const deletedProduct = await this.productsRepository.deleteProduct(productId);
    return deletedProduct;
  };
}

module.exports = ProductsService;
