import Mongo from '../config/MongoConnection';

const pictureNbVerif = async (req, res, next) => {
  console.log('in verif picture, headers', req.headers);
  const { username } = req.headers;
  console.log('in verif picture, username', username);
  const userdb = await Mongo.db.collection('users').findOne({ username });
  if (!userdb) {
    return res.send({error: 'pictureNbVerif', message: 'No user found'});
  }
  console.log('in verif, user data', userdb);
  console.log('in verif, tablenght', Object.keys(userdb.photoUrl).length);
  const numberOfPictures = Object.keys(userdb.photoUrl).length
  if (numberOfPictures >= 6) {
    return res.send({error: 'pictureNbVerif', message: 'You have reach the maximum of photos'});
  }
  req.headers.numberOfPictures = numberOfPictures;
  next();
};

export default pictureNbVerif;
