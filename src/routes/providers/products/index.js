const router = require('express').Router({ mergeParams: true });

const productDAO = require('./tableProducts');

router.get('/', (req, res) => {
  const products = productDAO.listAll(req.params.id);
  return res.json(products);
});

module.exports = router;