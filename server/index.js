const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const router = require('./src/Routes/router');
const logger = require('./src/Services/logger');
const Logger = new logger('Server')
const PORT = process.env.PORT || 3000;

const app = express();
app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(PORT, () => {
    Logger.info(`server is runnning on "http://localhost:${PORT}"`);
});