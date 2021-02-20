const FieldInvalid = require('../../../errors/FieldInvalid');
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

  async validate() {
    const fieldsType = [{
        shouldBe: 'string',
        columns: ['title']
      },
      {
        shouldBe: 'number',
        columns: ['price']
      },
      {
        shouldBe: 'integer',
        columns: ['provider']
      },

    ];

    fieldsType.forEach(fieldType => {
      fieldType.columns.forEach(column => {
        const value = this[column];
        if (typeof value !== fieldType.shouldBe || value.length === 0) {
          throw new FieldInvalid(column);
        }
      });

    })
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

  async remove() {
    return await productDAO.delete(this.id, this.provider);
  }
}

module.exports = Product;