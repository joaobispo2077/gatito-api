const NotSupportedValue = require('./errors/NotSupportedValue');

class Serializer {
    json(data) {
        return JSON.stringify(data);
    }

    serialize(data) {
        if (this.contentType === 'application/json') {
            return this.json(this.filter(data));
        }
        throw new NotSupportedValue(this.contentType);
    }

    filterObjects(data) {
        const grantedFields = {}

        this.publicFields.forEach(field => {
            if (data.hasOwnProperty(field)) {
                grantedFields[field] = data[field];
            }
        });

        return grantedFields;
    }

    filter(data) {
        if (Array.isArray(data)) {
            data = data.map(item => {
                return this.filterObjects(item);
            })
        } else {
            data = this.filterObjects(data);
        }

        return data;
    }
}

class SerializerProvider extends Serializer {
    constructor(contentType, extraFields) {
        super();
        this.contentType = contentType;
        this.publicFields = [
            'id',
            'empresa',
            'categoria'
        ].concat(extraFields || []);
    }
}

class SerializerError extends Serializer {
    constructor(contentType, extraFields) {
        super();
        this.contentType = contentType;
        this.publicFields = [
            'id',
            'mensagem'
        ].concat(extraFields || []);
    }
}

module.exports = {
    Serializer: Serializer,
    SerializerProvider: SerializerProvider,
    SerializerError: SerializerError,
    formats: ['application/json']
};