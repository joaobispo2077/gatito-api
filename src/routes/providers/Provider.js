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
    }

}

module.exports = Provider;