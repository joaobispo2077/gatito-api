const model = require('./modelTableProviders');

module.exports = {
    listAll() {
        return model.findAll();
    },

    insert(provider) {
        return model.create(provider);
    }
}