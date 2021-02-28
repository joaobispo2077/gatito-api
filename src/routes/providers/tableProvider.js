const Model = require('./modelTableProviders')
const NotFound = require('../../errors/NotFound')

module.exports = {
  listAll () {
    return Model.findAll({ raw: true })
  },

  insert (provider) {
    return Model.create(provider)
  },

  async searchById (id) {
    const searched = await Model.findOne({ where: { id: id } })

    if (!searched) {
      throw new NotFound()
    }

    return searched
  },

  update (id, datasToUpdate) {
    return Model.update(
      datasToUpdate, {
        where: { id: id }
      }
    )
  },

  remove (id) {
    return Model.destroy({ where: { id: id } })
  }
}
