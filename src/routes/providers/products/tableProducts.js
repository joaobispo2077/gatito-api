const Products = require('./modelTableProduct')
const connection = require('../../../database/connection')
const NotFound = require('../../../errors/NotFound')
module.exports = {
  async listAll (providerID) {
    return await Products.findAll({
      where: { provider: providerID },
      raw: true
    })
  },

  async findOneById (idProduct, idProvider) {
    const foundProduct = await Products.findOne({
      where: { id: idProduct, provider: idProvider },
      raw: true
    })

    if (!foundProduct) {
      throw new NotFound()
    }

    return foundProduct
  },
  async insert (product) {
    return await Products.create(product)
  },
  async update (product, updateData) {
    return await Products.update(updateData, {
      where: {
        id: product.id,
        provider: product.provider
      }
    })
  },

  async delete (idProduct, idProvider) {
    return await Products.destroy({
      where: {
        id: idProduct,
        provider: idProvider
      }
    })
  },

  async subtract (idProduct, idProvider, field, quantity) {
    return connection.transaction(async (transact) => {
      const product = await Products.findOne({ where: { id: idProduct, provider: idProvider } })

      product[field] = quantity

      await product.save()
      return product
    })
  }
}
