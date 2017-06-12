import jwt from 'jsonwebtoken';

import config from '../config/config';


const authControltest = (req, res) => {
  const token = req.body.token;
  console.log('in authControl token = ', token);
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log('auth error in api', err)
      return res.json({error: err.name, message: err.message }).end();
    } else {
      console.log('auth decoded in api', decoded)
      return res.json({error: ''}).end();
    }
  });

};

export default authControltest;
