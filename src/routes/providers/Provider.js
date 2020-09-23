const TableProvider = require('./tableProvider');

class Provider {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id;
        this.empresa = empresa;
        this.email = email;
        this.categoria = categoria;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async create() {
        const provider = await TableProvider.insert({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        });

        this.id = provider.id;
        this.dataCriacao = provider.dataCriacao;
        this.dataAtualizacao = provider.dataAtualizacao;
        this.versao = provider.versao;

        return provider;
    }

    async findById() {
        const provider = await TableProvider.searchById(this.id);

        this.id = provider.id;
        this.empresa = provider.empresa;
        this.email = provider.email;
        this.categoria = provider.categoria;
        this.dataCriacao = provider.dataCriacao;
        this.dataAtualizacao = provider.dataAtualizacao;
        this.versao = provider.versao;

        return provider;
    }

    async update() {
        await TableProvider.searchById(this.id);
        const columns = ['empresa', 'email', 'categoria'];
        const datasToUpdate = {}

        columns.forEach(async column => {
            const value = this[column];
            if (typeof value === 'string' && value.length > 0) {
                datasToUpdate[column] = value;
            }

        });
        if (Object.keys(datasToUpdate).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar');
        }

        await TableProvider.update(this.id, datasToUpdate);
    }

}

module.exports = Provider;