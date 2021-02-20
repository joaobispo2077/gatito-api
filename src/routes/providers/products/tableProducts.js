const Products = require('./modelTableProduct');
module.exports = {
  async listAll(providerID) {
    return await Products.findAll({
      where: { provider: providerID }
    });
  },

  async findOneById(idProduct, idProvider) {
    return await Products.findOne({
      where: { id: idProduct, provider: idProvider },
      raw: true
    })
  },
  async insert(product) {
    return await Products.create(product);
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