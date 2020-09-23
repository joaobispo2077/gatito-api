class NotFound extends Error {
    constructor() {
        super('O fornecedor não foi encontrado');
        this.name = 'NotFound';
        this.idError = 0;

    }
}

module.exports = NotFound;