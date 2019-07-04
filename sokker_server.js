const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Sokker');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('./ui/sokker-ui/build'));
const sokkerRoutes = require('./routes/sokker')(app);


const server = app.listen(9000, function() {
    console.log('Server running at http://localhost:9000');
});