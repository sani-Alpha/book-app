import {express, dotenv, path, passport, cookieSession, LoggerConstructor} from './config';
import router from './src/Routes/router';

dotenv.config();
const logger = new LoggerConstructor('Server');
const {PORT} = process.env;
const publicDir = path.join(__dirname, '/server/client/');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(publicDir));

app.use(
  cookieSession({
    name: 'mysession',
    keys: [process.env.SECRET],
    maxAge: 24 * 60 * 60 * 1000 // milliseconds to 24hrs
  })
);

// enabling passport for auth
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.listen(PORT, () => {
  logger.info(`server is runnning on "http://localhost:${PORT}"`);
});
