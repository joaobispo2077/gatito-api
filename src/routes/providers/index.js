const router = require('express').Router();
const TableProvider = require('./tableProvider');
const Provider = require('./Provider');

router.get('/', async(req, res) => {
    const providers = await TableProvider.listAll();
    res.status(200).json(providers);
});

router.post('/', async(req, res) => {
    const data = req.body;
    const provider = new Provider(data);
    await provider.create();
    res.status(201).json(provider);
});

module.exports = router;