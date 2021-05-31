const mongoclient = require('mongodb').MongoClient;
const LoggerConstructor = require('./logger');

const logger = new LoggerConstructor('DB-Script');

let db;
const connectDB = async callback => {
  try {
    mongoclient.connect(
      process.env.DB_URI || 'mongodb://localhost/my_books',
      {useUnifiedTopology: true},
      (error, client) => {
        db = client.db('Books');
        callback(error);
      }
    );
  } catch (err) {
    logger.error(err);
  }
  logger.info(`connected to Books`);
};

const getDB = () => db;

module.exports = {connectDB, getDB};
