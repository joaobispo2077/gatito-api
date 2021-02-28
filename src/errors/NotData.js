class NotData extends Error {
  constructor () {
    super('Não foram fornecidos dados para atualizar')

    this.name = 'NotData'
    this.idError = 2
  }
}

module.exports = NotData
