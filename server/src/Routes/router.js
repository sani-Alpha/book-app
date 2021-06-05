const {express, path, LoggerConstructor} = require('../Utility/imports');

const router = new express.Router();
const logger = new LoggerConstructor('Router');
const client = path.join(__dirname, '../../client/');
const getConnection = require('../Utility/dbScript');

let db;
getConnection.connectDB(async error => {
  if (error) logger.error(error);
  db = await getConnection.getDB();
});

router.use((req, res, next) => {
  logger.info(`Request recieved at ${req.url}`, req.body);
  next();
});

router.get('/', (req, res) => {
  res.status(200).sendFile('app.html', {root: client}, err => {
    if (err) {
      logger.error(err);
      res.status(500).send('Could not find the page requested');
    }
  });
});

router.post('/sendBook', async function (req, res) {
  const bookData = {
    name: req.query.name,
    author: req.query.author,
    pages: req.query.pages,
    price: req.query.price,
    genre: req.query.genre
  };

  if (
    bookData.name == null ||
    bookData.author == null ||
    bookData.pages == null ||
    bookData.price == null ||
    bookData.genre == null
  ) {
    logger.warning('Data Missing');
    res.status(500).send('Data missing');
  }

  try {
    await db.collection('books').insertOne(bookData, {upsert: true});
  } catch (err) {
    logger.error({message: err.message, stack: err.stack});
  } finally {
    logger.info('New Book inserted');
    res.status(200).send('Your books has been listed! Thank you!');
  }
});

router.get('/books', async function (req, res) {
  await db
    .collection('books')
    .find({})
    .toArray((error, result) => {
      if (error) {
        logger.error(error);
        res.status(500).send('Could not complete the request');
      }
      logger.info('Displayed data from database');
      res.status(200).send(result);
    });
});

module.exports = router;
