class NotFound extends Error {
  constructor () {
    super('O dado não foi encontrado')
    this.name = 'NotFound'
    this.idError = 0
  }
}

module.exports = NotFound
