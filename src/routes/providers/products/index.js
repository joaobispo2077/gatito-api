const router = require('express').Router({ mergeParams: true })

const Product = require('./Product')
const SerializerProduct = require('../../../Serializer').SerializerProduct
const productDAO = require('./tableProducts')

router.get('/', async (req, res) => {
  const products = await productDAO.listAll(parseInt(req.provider.id))
  const serializer = new SerializerProduct(
    res.getHeader('Content-Type')
  )

  res.set('X-Powered-By', 'Ruby 2.7')
  return res.send(serializer.serialize(products))
})

router.get('/:idProduct', async (req, res, next) => {
  try {
    const productParams = {
      id: parseInt(req.params.idProduct),
      provider: req.provider.id
    }
    const product = new Product(productParams)
    await product.getById()

    const serializer = new SerializerProduct(
      res.getHeader('Content-Type'), ['price', 'stock', 'provider', 'dataCriacao', 'dataAtualizacao', 'versao']
    )

    res.set('ETag', product.versao)
    const timestampProductLastModiefied = (new Date(product.dataAtualizacao)).getTime()
    res.set('Last-Modiefied', timestampProductLastModiefied)
    res.set('X-Powered-By', 'Ruby 2.7')
    res.send(serializer.serialize(product))
  } catch (err) {
    next(err)
  }
})

router.head('/:idProduct', async (req, res, next) => {
  try {
    const productParams = {
      id: parseInt(req.params.idProduct),
      provider: req.provider.id
    }
    const product = new Product(productParams)
    await product.getById()
    const timestampProductLastModiefied = (new Date(product.dataAtualizacao)).getTime()

    res
      .set('ETag', product.versao)
      .set('Last-Modiefied', timestampProductLastModiefied)
      .set('X-Powered-By', 'Ruby 2.7')
      .status(200)
      .end()
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const provider = parseInt(req.provider.id)
    const productParams = req.body
    console.log('productParams', productParams)
    const data = Object.assign({}, { ...productParams, provider })
    const product = new Product(data)
    console.log('product', product)
    await product.create()
    const serializer = new SerializerProduct(
      res.getHeader('Content-Type')
    )
    res.set('ETag', product.versao)
    const timestampProductLastModiefied = (new Date(product.dataAtualizacao)).getTime()
    res.set('Last-Modiefied', timestampProductLastModiefied)
    res.set('Location', `/providers/${product.provider}/products/${product.id}`)
    res.set('X-Powered-By', 'Ruby 2.7')
    res.status(201).send(serializer.serialize(product))
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

router.patch('/:idProduct', async (req, res, next) => {
  try {
    const productParams = Object.assign({},
      req.body, { id: req.params.idProduct, provider: req.provider.id })

    const product = new Product(productParams)
    await product.update()
    await product.getById()

    res.set('ETag', product.versao)
    const timestampProductLastModiefied = (new Date(product.dataAtualizacao)).getTime()
    res.set('Last-Modiefied', timestampProductLastModiefied)
    res.set('X-Powered-By', 'Ruby 2.7')
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:idProduct', async (req, res) => {
  const productParams = {
    id: parseInt(req.params.idProduct),
    provider: parseInt(req.provider.id)
  }

  const product = new Product(productParams)

  await product.remove()
  res.set('X-Powered-By', 'Ruby 2.7')
  res.status(204).end()
})

router.post('/:idProduct/subtract-stock', async (req, res, next) => {
  try {
    const quantity = req.body.quantity
    const product = new Product({ id: req.params.idProduct, provider: req.provider.id })
    await product.getById()
    if (((product.stock - quantity) < 0)) throw new Error('HOJE não é possível comprar esse produto nessa quantidade, diminua a quantidade')
    product.stock = product.stock - quantity
    await product.subtractStock()

    res.set('ETag', product.versao)
    const timestampProductLastModiefied = (new Date(product.dataAtualizacao)).getTime()
    res.set('Last-Modiefied', timestampProductLastModiefied)
    res.set('X-Powered-By', 'Ruby 2.7')
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
