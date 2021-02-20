const productDAO = require('./tableProducts');

class Product {
  constructor({ provider, id, title, price, stock, dataCriacao, dataAtualizacao, versao }) {
    this.id = id;
    this.provider = provider;
    this.title = title;
    this.price = price;
    this.stock = stock;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }

  async create() {
    const createdProduct = await productDAO.insert({
      title: this.title,
      provider: this.provider,
      price: this.price,
      stock: this.stock,
    });

    this.id = createdProduct.id;
    this.dataCriacao = createdProduct.dataCriacao;
    this.dataAtualizacao = createdProduct.dataAtualizacao;
    this.versao = createdProduct.versao;
  }
}

module.exports = Product;