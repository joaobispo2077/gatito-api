const tableProviders = require('../routes/providers/modelTableProviders');

tableProviders
    .sync()
    .then(() => console.log('Tabela de fornecedores criada com sucesso'))
    .catch(console.log);