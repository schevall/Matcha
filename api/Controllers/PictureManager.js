import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import Mongo from '../config/MongoConnection';


const nbVerif = async (req, res, next) => {
  console.log('in verif picture, headers', req.headers);
  const { username } = req.headers;
  console.log('in verif picture, username', username);
  const userdb = await Mongo.db.collection('users').findOne({ username });
  if (!userdb) {
    return res.send({ error: 'pictureNbVerif', message: 'No user found' });
  }
  console.log('in verif, user data', userdb);
  const numberOfPictures = Object.keys(userdb.photoUrl).length;
  if (numberOfPictures >= 6) {
    return res.send({ error: 'pictureNbVerif', message: 'You have reach the maximum of photos' });
  }
  req.headers.numberOfPictures = numberOfPictures;
  return next();
};

const upload = async (req, res) => {
  const { file } = req.file;
  const { username, numberOfPictures } = req.headers;

  const usercollection = await Mongo.db.collection('users');
  const userdb = await usercollection.findOne({ username });
  if (!userdb) {
    fs.unlinkSync(file);
    return res.send({ error: 'upload error', message: 'User not found in db' });
  }

  const userdir = `./uploads/${username}`;
  if (!fs.existsSync(userdir)) {
    fs.mkdirSync(userdir);
  }
  const time = new Date().getTime() / 1000;
  const newname = `${time}_${username}`;
  const newpath = `${userdir}/${newname}.jpeg`;

  await sharp(file).resize(240, 320).toFile(newpath);
  fs.unlinkSync(`./${file}`);

  await usercollection.updateOne(
    { username },
    { $push: {
      photoUrl: newpath } });
  return res.send({ error: '', newpath, numberOfPictures });
};

const getAll = async (req, res, next) => {
  const { username } = req.headers;
  console.log('in getall username =', username);
  const usercollection = await Mongo.db.collection('users');
  const userdb = await usercollection.findOne({ username });
  if (!userdb) {
    return res.send({ error: 'get all Pictures', message: 'No user provided' });
  }
  const dirname = path.resolve(__dirname, `../uploads/${username}/`);
  console.log('dirname', dirname);
  if (!fs.existsSync(dirname)) {
    console.log(fs.existsSync(dirname));
    return res.send({ error: 'get all Pictures', message: 'No pictures' });
  }

  const pack = [];
  fs.readdir(dirname, function(err, items) {
    console.log(items);

    for (let i = 0; i < items.length; i += 1) {
      console.log(items[i]);
      pack.push(`${dirname}/${items[i]}`);
    }
    console.log('pack', pack[1]);
    const img = new Buffer(pack[1], 'base64');

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length,
    });
    res.end(img);
  });
};

export { nbVerif, upload, getAll };
