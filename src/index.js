const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const router = require('./routes/providers/index');
const NotFound = require('./errors/notFound');

const app = express();
app.use(bodyParser.json());

app.use('/providers', router);

app.use((err, req, res, next) => {
    if (err instanceof NotFound) {
        res.status(404);
    } else {
        res.status(400);
    }
    res.send({ mensagem: err.message, id: err.idError });
});

app.listen(config.get('api.port'), () => {
    console.log("running at port 3000");
});