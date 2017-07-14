import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import Mongo from '../config/MongoConnection';

const initprofile = async (req, res) => {
  console.log('in initprofile');
  const { username } = req.headers;
  const usercollection = await Mongo.db.collection('users');
  const userdb = await usercollection.findOne({ username });

  if (!userdb) {
    return res.send({ error: 'initprofile', message: 'No user found' }).end();
  }

  const userbox = userdb;
  userbox.password = '';
  userbox.picturesNb = Object.keys(userdb.photoUrl).length ?
  Object.keys(userdb.photoUrl).length : 0;

  return res.send({ userbox });
};

const nbVerif = async (req, res, next) => {
  const { username } = req.headers;
  const usercollection = await Mongo.db.collection('users');
  const userdb = await usercollection.findOne({ username });

  if (!userdb) {
    return res.send({ error: 'pictureNbVerif', message: 'No user found' });
  }

  const numberOfPictures = Object.keys(userdb.photoUrl).length;
  if (numberOfPictures >= 6) {
    return res.send({ error: 'pictureNbVerif', message: 'You have reach the maximum of photos' });
  }
  return next();
};

const remove = async (req, res) => {
  const { username } = req.headers;
  const usercollection = await Mongo.db.collection('users');
  const userdb = await usercollection.findOne({ username });

  if (!userdb) {
    return res.send({ error: 'removePicture', message: 'No user found' }).end();
  }
  const { fileName } = req.body;
  const UserDirFullPath = path.join(path.normalize(`${__dirname}/..`), `uploads/${username}`);
  const pathToErase = path.join(UserDirFullPath, fileName);
  if (!fs.existsSync(pathToErase)) {
    return res.send({ error: 'removePicture', message: 'Something went wrong while deleting a picture' });
  }

  fs.unlinkSync(pathToErase);
  console.log('api, fileName = ', fileName);
  await usercollection.update(
    { username },
    { $pull: { photoUrl: `${fileName}` } });
  const picturesNb = userdb.photoUrl.length - 1;
  if (path.basename(userdb.profilePicturePath) === fileName) {
    await usercollection.update(
      { username },
      { $set: { profilePicturePath: '/static/icons/ic_face_black_36dp_2x.png' } });
  }
  return res.send({ error: '', fileName, picturesNb });
};

const favorite = async (req, res) => {
  const { username } = req.headers;
  const usercollection = await Mongo.db.collection('users');
  const userdb = await usercollection.findOne({ username });

  if (!userdb) {
    return res.send({ error: 'favoritePicture', message: 'No user found' }).end();
  }

  const { fileName } = req.body;
  const UserDirFullPath = path.join(path.normalize(`${__dirname}/..`), `uploads/${username}`);
  const pathToFavorite = path.join(UserDirFullPath, fileName);
  if (!fs.existsSync(pathToFavorite)) {
    return res.send({ error: 'favoritePicture', message: 'Something went wrong while faving this picture' });
  }

  const profilePicturePath = `/static/${username}/${fileName}`;
  await usercollection.updateOne(
    { username },
    { $set: { profilePicturePath } });
  return res.send({ error: '', profilePicturePath });
};

const upload = async (req, res) => {
  const { file } = req;
  const { username } = req.headers;
  const usercollection = await Mongo.db.collection('users');
  const userdb = await usercollection.findOne({ username });

  if (!userdb) {
    fs.unlinkSync(file);
    return res.send({ error: 'upload error', message: 'User not found in db' });
  }

  const UserDirFullPath = path.join(path.normalize(`${__dirname}/..`), `uploads/${username}`);
  if (!fs.existsSync(UserDirFullPath)) {
    fs.mkdirSync(UserDirFullPath);
  }
  const time = new Date().getTime() / 1000;
  const newname = `${time}_${username}.jpeg`;
  const oldpath = path.join(path.normalize(`${__dirname}/..`), `${file.destination}/`, `${file.filename}`);

  await sharp(oldpath).resize(200, 200).toFile(`./uploads/${username}/${newname}`);
  fs.unlinkSync(oldpath);

  await usercollection.updateOne(
    { username },
    { $push: { photoUrl: newname } });
  const picturesNb = userdb.photoUrl.length + 1;
  return res.send({ error: '', fileName: newname, picturesNb });
};

export { nbVerif, upload, initprofile, remove, favorite };
