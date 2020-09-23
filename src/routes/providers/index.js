const router = require('express').Router();

const TableProvider = require('./tableProvider');


const Provider = require('./Provider');

router.get('/', async(req, res) => {
    const providers = await TableProvider.listAll();
    res.status(200).json(providers);
});

router.get('/:id', async(req, res) => {

    try {
        const id = req.params.id;
        const provider = new Provider({ id: id });
        await provider.findById();
        res.status(200).json(provider);
    } catch (err) {
        res.status(404).send({ mensagem: err.message });
    }

});

router.post('/', async(req, res) => {
    try {
        const data = req.body;
        const provider = new Provider(data);
        const createdProvider = await provider.create();
        res.status(201).json(createdProvider);

    } catch (err) {
        res.status(400).send({ mensagem: err.message });
    }
});

router.patch('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const datas = Object.assign({}, data, { id: id });
        const provider = new Provider(datas);
        await provider.update();
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const provider = new Provider({ id: parseInt(id) });
        await provider.delete();
        res.status(200).json({ id: id });

    } catch (err) {
        res.status(404).send({ mensagem: err.message });
    }
});

module.exports = router;