const router = require('express').Router({ mergeParams: true });

const Product = require('./Product');
const SerializerProduct = require('../../../Serializer').SerializerProduct;
const productDAO = require('./tableProducts');

router.get('/', async(req, res) => {
  const products = await productDAO.listAll(parseInt(req.provider.id));
  const serializer = new SerializerProduct(
    res.getHeader('Content-Type'),
  );
  return res.send(serializer.serialize(products));
});

router.get('/:idProduct', async(req, res, next) => {
  try {
    const productParams = {
      id: parseInt(req.params.idProduct),
      provider: req.provider.id
    }
    const product = new Product(productParams)
    await product.getById();

    const serializer = new SerializerProduct(
      res.getHeader('Content-Type'), ['price', 'stock', 'provider', 'dataCriacao', 'dataAtualizacao', 'versao']
    );

    res.send(serializer.serialize(product));
  } catch (err) {
    next(err);
  }
});

router.post('/', async(req, res) => {
  try {

    const provider = parseInt(req.provider.id);
    const productParams = req.body;
    console.log("productParams", productParams)
    const data = Object.assign({}, {...productParams, provider });
    const product = new Product(data);
    console.log("product", product)
    await product.create();
    const serializer = new SerializerProduct(
      res.getHeader('Content-Type'),
    );

    res.status(201).send(serializer.serialize(product));
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