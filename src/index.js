const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');

const router = require('./routes/providers/index');
const NotFound = require('./errors/NotFound');
const FieldInvalid = require('./errors/FieldInvalid');
const NotData = require('./errors/NotData');
const NotSupportedValue = require('./errors/NotSupportedValue');
const SerializerError = require('./Serializer').SerializerError;

const formats = require('./Serializer').formats;

const app = express();
app.use(cors()); // cors middleware
app.use(bodyParser.json());

//next => próximo middlware a ser executado ou as próximas rotas
app.use((req, res, next) => {
  let formatRequest = req.header('Accept');

  if (formatRequest === '*/*') {
    formatRequest = 'application/json';
  }

  if (formats.indexOf(formatRequest) === -1) {
    res.status(406).end();
    return
  }

  res.setHeader('Content-Type', formatRequest);
  next();


});

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*'); // cors without middleware
});

app.use('/providers', router);

app.use((err, req, res, next) => {
  let status = 500;

  if (err instanceof NotFound) {
    status = 404;
  }

  if (err instanceof FieldInvalid || err instanceof NotData) {
    status = 400;
  }

  if (err instanceof NotSupportedValue) {
    status = 406;
  }

  const serializerError = new SerializerError(
    res.getHeader('Content-Type')
  );

  res.status(status).send(
    serializerError.serialize({
      mensagem: err.message,
      id: err.idError
    }));
});

app.listen(config.get('api.port'), () => {
  console.log("running at port 3000");
});