const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const router = require('./routes/providers/index');

const app = express();
app.use(bodyParser.json());

app.use('/providers', router);

app.listen(config.get('api.port'), () => {
    console.log("running at port 3000");
});