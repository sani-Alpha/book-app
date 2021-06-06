import {express, LoggerConstructor} from '../Utility/imports';
import {createBook, getBooks, getAuthors} from '../Methods/library';
import {connectDB, getDB} from '../Utility/dbScript';

const router = new express.Router();
const logger = new LoggerConstructor('Router');
const clientPath = `${process.cwd()}/server/client`;

let db;
connectDB(async error => {
  if (error) logger.error(error.message, error.stack);
  db = await getDB();
});

router.use((req, res, next) => {
  logger.info(req.url, req.body);
  next();
});

router.get('/', (req, res) => {
  res.status(200).sendFile('app.html', {root: clientPath}, err => {
    if (err) {
      logger.error(err.message, err.stack);
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

  if (bookData) {
    try {
      const newBook = await createBook(db, bookData);
      if (newBook) {
        logger.info('New Book inserted', newBook);
        res.status(200).send('Your books has been listed! Thank you!');
      }
      res.status(200).send('Book already exists');
    } catch (err) {
      logger.error(err.message, err.stack);
    }
  } else {
    logger.warning('Data Missing');
    res.status(500).send('Data missing');
  }
});

router.get('/books', async function (req, res) {
  try {
    const books = await getBooks(db);
    logger.info('Listing all the books from database');
    res.status(200).send(books);
  } catch (err) {
    logger.error(err.message, err.stack);
    logger.warning('Data Missing');
    res.status(500).send('Data missing');
  }
});

router.get('/authors', async function (req, res) {
  try {
    const authors = await getAuthors(db);
    logger.info('Listing all the authors from database');
    res.status(200).send(authors);
  } catch (err) {
    logger.error(err.message, err.stack);
    logger.warning('Data Missing');
    res.status(500).send('Data missing');
  }
});

export default router;
