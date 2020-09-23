const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const router = require('./routes/providers/index');
const NotFound = require('./errors/NotFound');
const FieldInvalid = require('./errors/FieldInvalid');
const NotData = require('./errors/NotData');

const app = express();
app.use(bodyParser.json());

app.use('/providers', router);

app.use((err, req, res, next) => {
    let status = 500;

    if (err instanceof NotFound) {
        status = 404;
    }

    if (err instanceof FieldInvalid || err instanceof NotData) {
        status = 400;
    }

    res.status(status).send({
        mensagem: err.message,
        id: err.idError
    });
});

app.listen(config.get('api.port'), () => {
    console.log("running at port 3000");
});