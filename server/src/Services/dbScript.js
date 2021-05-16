const logger = require('./logger');
const Logger = new logger('DB-Script')
const mongoclient = require('mongodb').MongoClient; 
const objectid = require('mongodb').ObjectID;

let db;
const connectDB = async (callback) => {
        try {
            mongoclient.connect(process.env.DB_URI||'mongodb://localhost/my_books', {useUnifiedTopology: true}, (error,client) => {
                db = client.db('Books');
                callback(error);
            });
        } catch(err) {
            Logger.error(err);
        }
    Logger.info(`connected to Books`);
}

const getDB = () => db;

module.exports = {connectDB, getDB};