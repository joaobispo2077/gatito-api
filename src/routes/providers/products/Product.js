const FieldInvalid = require('../../../errors/FieldInvalid');
const productDAO = require('./tableProducts');
const NotData = require('../../../errors/NotData');

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

  async validate() {
    console.log("price", this.price)
    if (typeof this.price !== 'number' || this.price.length === 0) {
      throw new FieldInvalid('price');
    }

    if (typeof this.title !== 'string' || this.title.length === 0) {
      throw new FieldInvalid('title');
    }
  }

  async getById() {
    const product = await productDAO.findOneById(this.id, this.provider);

    this.title = product.title;
    this.price = product.price;
    this.stock = product.stock;
    this.dataCriacao = product.dataCriacao;
    this.dataAtualizacao = product.dataAtualizacao;
    this.versao = product.versao;
  }

  async create() {
    await this.validate();
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

  async update() {

    const dataUpdate = {}

    if (typeof this.price === 'number' && this.price > 0) {
      dataUpdate.price = this.price;
    }

    if (typeof this.title === 'string' && this.title.length !== 0) {
      dataUpdate.title = this.title;
    }

    if (typeof this.stock === 'number') {
      dataUpdate.stock = this.stock;
    }

    if (Object.keys(dataUpdate).length === 0) {
      throw new NotData('Não foram fornecidos dados para atualizar o produto');
    }

    return await productDAO.update({ id: this.id, provider: this.provider }, dataUpdate);
  }

  async remove() {
    return await productDAO.delete(this.id, this.provider);
  }

  async subtractStock() {
    return await productDAO.subtract(this.id, this.provider, "stock", this.stock);
  }
}

module.exports = Product;