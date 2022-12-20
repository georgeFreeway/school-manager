import express from 'express';
import config from 'config';
import log from './utils/logger';
import router from './routes/index';
import { deserializeUser } from './middlewares/deserializeStudent';
require('./utils/connect');

const app = express();
app.use(deserializeUser);
app.use(express.json());

const port = config.get<number>('port');

app.listen(port, () => {
    log.info(`server sope otilo, e don go 🚀:${port}`);
});

app.use('/api/school-manager', router);
