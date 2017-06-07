import jwt from 'jsonwebtoken';

import Mongo from '../config/MongoConnection';
import config from '../config/config';


const authControl = (req, res, next) => {
  console.log('in authControl', req.body);
  return next();
};

export default authControl;
