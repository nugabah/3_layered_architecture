const { PrismaClient } = require('@prisma/client');

class ProductsRepository {
  prisma = new PrismaClient();
  createProduct = async (userId, title, content) => {
    const joinUser = await this.prisma.Users.findFirst({ where: { userId: +userId } });
    const product = await this.prisma.Products.create({
      data: { userId: userId, name: joinUser.name, title, content },
    });
    await this.prisma.$disconnect();
    return product;
  };

  readAllProducts = async () => {
    const products = await this.prisma.Products.findMany({
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
    await this.prisma.$disconnect();
    return products;
  };

  readDetailProduct = async productId => {
    const product = await this.prisma.Products.findFirst({
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
    await this.prisma.$disconnect();
    return product;
  };

  findPIdProduct = async productId => {
    const product = await this.prisma.Products.findFirst({ where: { productId: +productId } });
    await this.prisma.$disconnect();
    return product;
  };

  updateProduct = async (title, content, status, productId) => {
    const updatedProduct = await this.prisma.Products.update({
      where: { productId: +productId },
      data: { title: title, content: content, status: status },
    });
    await this.prisma.$disconnect();
    return updatedProduct;
  };

  deleteProduct = async productId => {
    const deletedProduct = await this.prisma.Products.delete({
      where: { productId: +productId },
    });
    await this.prisma.$disconnect();
    return deletedProduct;
  };
}

module.exports = ProductsRepository;
