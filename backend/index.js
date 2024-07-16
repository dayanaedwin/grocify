const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const route = require('./routes');

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const URL = process.env.MONGODB_CONNECTION_URL;

app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(response => {
    console.log("Successfully connected to Mongo DB");
    app.listen(PORT, () => {
        console.log(`App running in port ${PORT}`);
    });
}).catch(error => {
    console.log("Error connecting to Mongo DB");
});

app.use('/', route);