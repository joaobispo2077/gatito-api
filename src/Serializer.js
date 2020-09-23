const NotSupportedValue = require('./errors/NotSupportedValue');

class Serializer {
    json(datas) {
        return JSON.stringify(datas);
    }

    serialize(datas) {
        if (this.contentType === 'application/json') {
            return this.json(datas);
        }
        throw new NotSupportedValue(this.contentType);
    }
}

class SerializerProvider extends Serializer {
    constructor(contentType) {
        super();
        this.contentType = contentType;
    }
}

module.exports = {
    Serializer: Serializer,
    SerializerProvider: SerializerProvider,
    formats: ['application/json']
};