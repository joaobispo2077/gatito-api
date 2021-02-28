const tableProviders = require('../routes/providers/modelTableProviders')
const tableProducts = require('../routes/providers/products/modelTableProduct')

const tables = [
  tableProviders,
  tableProducts
]
async function createTables () {
  await tables.forEach(async table => {
    await table
      .sync()
      .then(() => console.log(`Tabela ${table} criada com sucesso`))
      .catch(console.log)
  })
}

createTables()
