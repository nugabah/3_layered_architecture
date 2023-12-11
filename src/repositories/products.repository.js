const prisma = require('../utils/prisma/index.js');

class ProductsRepository {
  createProduct = async (userId, title, content) => {
    const joinUser = await prisma.Users.findFirst({ where: { userId: +userId } });
    const product = await prisma.Products.create({
      data: { userId: userId, name: joinUser.name, title, content },
    });
    await prisma.$disconnect();
    return product;
  };

  readAllProducts = async () => {
    const products = await prisma.Products.findMany({
      select: {
        productId: true,
        title: true,
        name: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    await prisma.$disconnect();
    return products;
  };

  readDetailProduct = async productId => {
    const product = await prisma.Products.findFirst({
      select: {
        productId: true,
        title: true,
        name: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { productId: +productId },
    });
    await prisma.$disconnect();
    return product;
  };

  findPIdProduct = async productId => {
    const product = await prisma.Products.findFirst({ where: { productId: +productId } });
    await prisma.$disconnect();
    return product;
  };

  updateProduct = async (title, content, status, productId) => {
    const updatedProduct = await prisma.Products.update({
      where: { productId: +productId },
      data: { title: title, content: content, status: status },
    });
    await prisma.$disconnect();
    return updatedProduct;
  };

  deleteProduct = async productId => {
    const deletedProduct = await prisma.Products.delete({
      where: { productId: +productId },
    });
    await prisma.$disconnect();
    return deletedProduct;
  };
}

module.exports = ProductsRepository;
