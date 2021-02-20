const router = require('express').Router({ mergeParams: true });

const Product = require('./Product');
const productDAO = require('./tableProducts');

router.get('/', (req, res) => {
  const products = productDAO.listAll(req.params.id);
  return res.json(products);
});

router.post('/', async(req, res) => {
  const provider = parseInt(req.params.id);
  const productParams = req.body;
  const data = Object.assign({}, {...productParams, provider });
  const product = new Product(data);

  await product.create();

  res.status(201).json(product);
});
module.exports = router;