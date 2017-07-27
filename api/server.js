import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import multer from 'multer';
import socketIo from 'socket.io';
import socketioJwt from 'socketio-jwt';

import config from './config/config.js';
import Mongo from './config/MongoConnection.js';
import routes from './routes.js';
import socket from './socketGate.js';

const app = express();
const port = (8000);
const server = http.createServer(app);
const io = socketIo(server);
const upload = multer({ dest: './uploads/tmp/' });
const users = [];

io.use(socketioJwt.authorize({
  secret: config.secret,
  handshake: true,
}));

io.on('connection', socket(users));

Mongo.connect();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use('/static', express.static(`${__dirname}/uploads`));

routes(app, upload);

server.listen(port);
