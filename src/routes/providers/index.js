const router = require('express').Router();
const TableProvider = require('./tableProvider');

router.use('/', async(req, res) => {
    const providers = await TableProvider.listAll();
    res.status(200).json(JSON.stringify(providers));
});

module.exports = router;