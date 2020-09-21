const model = require('./modelTableProviders');

module.exports = {
    listAll() {
        return model.findAll();
    }
}