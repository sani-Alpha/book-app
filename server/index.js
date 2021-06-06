import {express, dotenv, passport, cookieSession, LoggerConstructor} from './config';
import router from './src/Routes/router';

dotenv.config();
const logger = new LoggerConstructor('Server');
const {PORT} = process.env;
const publicDir = `${process.cwd()}/server/client/public`;

const app = express();
app.use('/', router);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(publicDir));

app.use(
  cookieSession({
    name: 'mysession',
    keys: [process.env.SECRET],
    maxAge: 24 * 60 * 60 * 1000 //milliseconds to 24hrs
  })
);

//enabling passport for auth
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => {
  logger.info(`server is runnning on "http://localhost:${PORT}"`);
});
