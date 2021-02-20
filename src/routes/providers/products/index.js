const router = require('express').Router({ mergeParams: true });

const Product = require('./Product');
const productDAO = require('./tableProducts');

router.get('/', async(req, res) => {
  const products = await productDAO.listAll(parseInt(req.params.id));
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

router.delete('/:idProduct', async(req, res) => {
  const productParams = {
    id: parseInt(req.params.idProduct),
    provider: parseInt(req.params.idProduct),
  };

  const product = new Product(productParams);

  await product.remove();
});

module.exports = router;