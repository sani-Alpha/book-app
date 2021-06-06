import {express, passport, passportLocal, bcrypt, LoggerConstructor} from '../../config';
import {createBook, getBooks, getAuthors} from '../Methods/Library/library';
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

router.post('/api/sendBook', async function (req, res) {
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

router.get('/api/books', async function (req, res) {
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

router.get('/api/authors', async function (req, res) {
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

//post request to register into db user details
router.post('/api/register', (req, res) => {
  let data = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  };

  try {
    db.collection('users').insert(data);
  } catch (err) {
    logger.error(err.message, err.stack);
    res.status(500).send('Could not find the user requested');
  }

  res.status(200).send('Signup Successful');
});

// router.post('/api/changePassword', (req, res) => {
//   let data = {
//     oldPassword: req.body.name,
//     username: req.body.username,
//     password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
//   };

//   try {
//     db.collection('users').updateOne({});
//   } catch (err) {
//     logger.error(err.message, err.stack);
//     res.status(500).send('Could not find the user requested');
//   }

//   res.status(200).send('Signup Successful');
// });

//post request from client to login page
router.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      logger.error(err.message, err.stack);
      return next(err);
    }
    if (!user) {
      res.status(400).send([user, 'Cannot Log In!', info]);
    }

    req.login(user, err => {
      if (err) {
        logger.error(err.message, err.stack);
      }
      res.send('Logged In!');
    });
  })(req, res, next);
});

//get request from client to logout
router.get('/api/logout', (req, res) => {
  req.logout();
  res.send('Logged Out!');
});

//defining middleware filter
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not Authenticated!');
  } else {
    return next();
  }
};

//get request from client to fetch authenticated users
router.get('/api/user', authMiddleware, async (req, res) => {
  try {
    let user = await db.collection('users').findOne({_id: req.user._id});
    if (user._id == req.session.passport.user) {
      // console.log([user, req.session]);
      res.send({
        user: {
          name: user.name,
          authenticated: true
        }
      });
    } else res.status(200).send('Please Log In');
  } catch (err) {
    logger.error(err.message, err.stack);
  }
});

//using local auth strategy
passport.use(
  new localStrat(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        let user = await db.collection('users').findOne({email: username});
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) console.log(err);
          if (user.email === username && result) {
            return done(null, user);
          } else return done(null, false, {message: 'Incorrect username or password'});
        });
      } catch (err) {
        logger.error(err.message, err.stack);
        done(err);
      }
    }
  )
);

//user identification from cookie using id
passport.serializeUser((user, done) => {
  done(null, user._id);
});

//fulffiling request to access secured URL
passport.deserializeUser(async (userId, done) => {
  try {
    let user = await db.collection('users').findOne({_id: userId});
    done(null, user);
  } catch (err) {
    logger.error(err.message, err.stack);
    done(err);
  }
});

export default router;
