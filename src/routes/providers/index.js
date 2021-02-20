const router = require('express').Router();

const TableProvider = require('./tableProvider');
const Provider = require('./Provider');
const SerializerProvider = require('../../Serializer').SerializerProvider;

router.get('/', async(req, res) => {
  const providers = await TableProvider.listAll();


  const serializeProvider = new SerializerProvider(
    res.getHeader('Content-Type')
  );

  res.status(200); //.json(providers);
  res.send(serializeProvider.serialize(providers));
});

router.get('/:id', async(req, res, next) => {

  try {
    const id = req.params.id;
    const provider = new Provider({ id: id });

    await provider.findById();
    res.status(200); // .json(provider);
    const serializeProvider = new SerializerProvider(
      res.getHeader('Content-Type'), ['email', 'dataCriacao', 'dataAtualizacao', 'versao']
    );

    res.send(serializeProvider.serialize(provider));

  } catch (err) {
    next(err);
  }

});

router.post('/', async(req, res, next) => {
  try {
    const data = req.body;
    const provider = new Provider(data);
    const createdProvider = await provider.create();



    const serializeProvider = new SerializerProvider(
      res.getHeader('Content-Type')
    );

    res.status(201) //.json(createdProvider);
      .send(serializeProvider.serialize(provider));

  } catch (err) {
    next(err);
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

router.delete('/:id', async(req, res, next) => {
  try {
    const id = req.params.id;
    const provider = new Provider({ id: parseInt(id) });
    await provider.delete();

    res.status(200).json({ id: id });
  } catch (err) {
    next(err);
  }
});

const productsRouter = require('./products');

const verifyProvider = async(req, res, next) => {
  try {
    const id = req.params.id;
    const provider = new Provider({ id });
    await provider.findById();
    req.provider = provider;
    next();
  } catch (err) {
    next(err);
  }
}
router.use('/:id/products', verifyProvider, productsRouter);


module.exports = router;