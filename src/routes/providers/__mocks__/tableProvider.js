module.exports = {
  async listAll () {
    return []
  },

  async insert (provider) {
    return {
      id: 20,
      dataCriacao: '24/12/6000',
      dataAtualizacao: '24/20/6000',
      versao: 3
    }
  },

  async searchById (id) {
    return {
      id: 20,
      dataCriacao: '24/12/6000',
      dataAtualizacao: '24/20/6000',
      versao: 3
    }
  },

  async update (id, datasToUpdate) {

  },

  async remove (id) {

  }
}
