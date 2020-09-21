const express = require('express');
const body = require('body-parser');

module.exports = () => {
    const app = express();

    app.use(body.urlencoded({
        extended: true
    }));

    app.use(body.json());

    return app;
}