import express from 'express';
import routes from './routes';
import cors from 'cors';

import 'express-async-errors';

import './database/connection';
import handleError from './error/handle';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handleError);

app.listen(3333);
