const Products = require('./modelTableProduct');
module.exports = {
  async listAll(providerID) {
    return await Products.findAll({
      where: { provider: providerID }
    });
  },
  async insert(product) {
    return await Products.create(product);
  }
}