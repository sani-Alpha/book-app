import {mongoclient, dotenv, LoggerConstructor} from '../../config';

const logger = new LoggerConstructor('DB-Script');
dotenv.config();

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
    logger.error(err.message, err.stack);
  }
  logger.info(`connected to Books`);
};

const getDB = () => db;

export {connectDB, getDB};
