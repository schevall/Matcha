import express from 'express';
import http from 'http';
import jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import path from 'path';

import Mongo from './configMongo/MongoConnection';
// import config from './configMongo/config';

import routes from './routes';

const app = express();
const port = (process.env.PORT || 8000);
const server = http.createServer(app);

Mongo.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

routes(app);

app.use((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(404, 'Page introuvable !');
});


server.listen(port);
