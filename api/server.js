import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import path from 'path';

import Mongo from './config/MongoConnection';
import routes from './routes';

const app = express();
const port = (8000);
const server = http.createServer(app);

Mongo.connect();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

server.listen(port);
