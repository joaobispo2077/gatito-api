const Products = require('./modelTableProduct');
module.exports = {
  async listAll(providerID) {
    return await Products.findAll({
      where: { provider: providerID },
      raw: true
    });
  },

  async findOneById(idProduct, idProvider) {
    return await Products.findOne({
      where: { id: idProduct, provider: idProvider },
      raw: true,

    })
  },
  async insert(product) {
    return await Products.create(product);
  },
  async update(product, updateData) {
    return await Products.update(updateData, {
      where: {
        id: product.id,
        provider: product.provider,
      }
    })
  },

  async delete(idProduct, idProvider) {
    return await Products.destroy({
      where: {
        id: idProduct,
        provider: idProvider,
      }
    });
  },
}