const {express, path, LoggerConstructor} = require('./src/Utility/imports');

const router = require('./src/Routes/router');

const logger = new LoggerConstructor('Server');
const {PORT} = process.env;
const publicDir = path.join(__dirname, '../../client/public');

const app = express();
app.use('/', router);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(publicDir));

app.listen(PORT, () => {
  logger.info(`server is runnning on "http://localhost:${PORT}"`);
});
