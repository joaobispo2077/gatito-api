const customExpress = require('./config/customExpress');

const app = customExpress();

app.listen(3333, (req, res) => {
    console.log("running at port 3333");
});