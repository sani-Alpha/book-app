import {express, dotenv, LoggerConstructor} from './src/Utility/imports';
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

app.listen(PORT, () => {
  logger.info(`server is runnning on "http://localhost:${PORT}"`);
});
