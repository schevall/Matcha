import Mongo from '../config/MongoConnection';
import fs from 'fs';

const getallpictures = async (req, res) => {

  const { username } = req.headers;
  const userdb = await Mongo.db.collection('users').findOne({ username });
  if (!userdb) {
    return res.send({error: 'upload error', message: 'No user provided'});
  }
  const photoUrl = userdb.photoUrl;
  const photopack = [];
  photoUrl.forEach((photo) => {
    const img = fs.readFileSync(photo);
    photopack.push(img);
  });

  console.log('in getallpictures', photopack);
  return res.send({error: '', photopack });
};

export default getallpictures;
