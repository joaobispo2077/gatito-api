const jsontoxml = require('jsontoxml');

const NotSupportedValue = require('./errors/NotSupportedValue');

class Serializer {
    json(data) {
        return JSON.stringify(data);
    }

    xml(data) {
        let tag = this.tagSingular;

        if (Array.isArray(data)) {
            tag = this.tagPlural;
            data = data.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }
        return jsontoxml({
            [tag]: data });
    }

    serialize(data) {
        data = this.filter(data);
        if (this.contentType === 'application/json') {
            return this.json(data);
        }

        if (this.contentType === 'application/xml') {
            return this.xml(data);

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
        this.tagSingular = 'fornecedor';
        this.tagPlural = 'fornecedores';
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
        this.tagSingular = 'erro';
        this.tagPlural = "erros";
    }
}

module.exports = {
    Serializer: Serializer,
    SerializerProvider: SerializerProvider,
    SerializerError: SerializerError,
    formats: ['application/json', 'application/xml']
};