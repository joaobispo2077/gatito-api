class NotSupportedValue extends Error {
  constructor (contentType) {
    super(`O tipo ${contentType} não é suportado pela API`)
    this.name = 'NotSupportedValue'
    this.idError = 3
  }
}
module.exports = NotSupportedValue
