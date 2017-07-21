import jwt from 'jsonwebtoken';

import config from '../config/config';
import { checkUser } from '../DbAction/DbAction.js';

const authControl = async (req, res, next) => {
  const { username } = req.headers;
  if (!username) {
    return res.send({ error: 'upload error', message: 'No user provided' });
  }

  const token = req.body.token || req.query.token || req.headers.token;
  if (!token) {
    return res.send({ error: 'authControl', message: 'No token Provided' });
  }

  if (!await checkUser(username)) {
    return res.send({ error: 'No user', message: 'No user found' });
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.send({ error: 'authControl', message: err.message });
      }
      if (Date.now() / 1000 > decoded.exp) {
        return res.send({ error: 'authControl', message: 'Your session has expired' });
      }
      return next();
    });
  }
};

export default authControl;
