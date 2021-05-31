const express = require('express');
require('dotenv').config();
const router = require('./src/Routes/router');
const LoggerConstructor = require('./src/Services/logger');

const logger = new LoggerConstructor('Server');
const {PORT} = process.env;

const app = express();
app.use('/', router);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(PORT, () => {
  logger.info(`server is runnning on "http://localhost:${PORT}"`);
});
