jest.mock('../../../src/routes/providers/tableProvider.js')
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

  test('method create() should create with success', async () => {
    const provider = new Provider({
      empresa: 'Gatito Teste',
      email: 'teste@teste.com.br',
      categoria: 'brinquedos'
    })

    await provider.create()

    expect(provider.id).toBe(20)
    expect(provider.dataCriacao).toBe('24/12/6000')
    expect(provider.dataAtualizacao).toBe('24/20/6000')
    expect(provider.versao).toBe(3)
  })
})
