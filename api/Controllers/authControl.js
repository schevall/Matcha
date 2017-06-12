import jwt from 'jsonwebtoken';

import config from '../config/config';

const authControl = (req, res, next) => {
  const token = req.body.token;
jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.json({error: err.name, message: err.message }).end();
    } else {
      console.log(decoded)
      next();
    }
  });
};

export default authControl;
