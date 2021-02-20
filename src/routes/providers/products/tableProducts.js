const Products = require('./modelTableProduct');
module.exports = {
  async listAll(providerID) {
    return await Products.findAll({
      where: { provider: providerID }
    });
  }
}