const router = require('express').Router({ mergeParams: true });

const Product = require('./Product');
const productDAO = require('./tableProducts');

router.get('/', async(req, res) => {
  const products = await productDAO.listAll(parseInt(req.provider.id));
  return res.json(products);
});

router.post('/', async(req, res) => {
  try {

    const provider = parseInt(req.provider.id);
    const productParams = req.body;
    const data = Object.assign({}, {...productParams, provider });
    const product = new Product(data);

    await product.create();

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

router.delete('/:idProduct', async(req, res) => {
  const productParams = {
    id: parseInt(req.params.idProduct),
    provider: parseInt(req.provider.id),
  };

  const product = new Product(productParams);

  await product.remove();

  res.status(204).end();
});

module.exports = router;