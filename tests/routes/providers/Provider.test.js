const Provider = require('../../../src/routes/providers/Provider')

describe('Provider class', () => {
  test('method validate() should return true', () => {
    const provider = new Provider({
      empresa: 'Gatito Teste',
      email: 'teste@teste.com.br',
      categoria: 'brinquedos'
    })

    expect(provider.validate()).toBe(true)
  })
})
