class FieldInvalid extends Error {
    constructor(field) {
        const message = `o campo ${field} está inválido`;


        super(message);
        this.name = 'FielInvalid';
        this.idError = 1;
    }
}

module.exports = FieldInvalid;