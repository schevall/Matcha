import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import multer from 'multer';

// import path from 'path';

import Mongo from './config/MongoConnection';
import routes from './routes';

const app = express();
const port = (8000);
const server = http.createServer(app);
const upload = multer({ dest: './uploads/tmp/' });

Mongo.connect();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use('/static', express.static(`${__dirname}/uploads`));

routes(app, upload);

server.listen(port);
