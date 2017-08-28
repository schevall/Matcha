import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import Mongo from '../config/MongoConnection';
import * as db from '../DbAction/DbAction.js';

const nbVerif = async (req, res, next) => {
  const { username } = req.headers;
  const userInfo = await db.getUserdb(username);
  const numberOfPictures = Object.keys(userInfo.picturesPath).length;
  if (numberOfPictures >= 6) {
    return res.send({ error: 'pictureNbVerif', message: 'You have reach the maximum of photos' });
  }
  return next();
};

const remove = async (req, res) => {
  const { username } = req.headers;
  const { fileName } = req.body;
  const UserDirFullPath = path.join(path.normalize(`${__dirname}/..`), `uploads/${username}`);
  const pathToErase = path.join(UserDirFullPath, fileName);
  if (!fs.existsSync(pathToErase)) {
    return res.send({ error: 'removePicture', message: 'Something went wrong while deleting a picture' });
  }
  const userdb = await db.getUserdb(username);
  if (userdb.profilePicturePath === fileName) {
    return res.send({ error: 'removePicture', message: 'You can\'t delete yout profile picture !' });
  }
  const doc = await db.removePicture(username, fileName);
  const { picturesPath } = doc;
  fs.unlinkSync(pathToErase);

  return res.send({ error: '', picturesPath });
};

const favorite = async (req, res) => {
  const { username } = req.headers;
  const { fileName } = req.body;
  const UserDirFullPath = path.join(path.normalize(`${__dirname}/..`), `uploads/${username}`);
  const pathToFavorite = path.join(UserDirFullPath, fileName);
  if (!fs.existsSync(pathToFavorite)) {
    return res.send({ error: 'favoritePicture', message: 'Something went wrong while faving this picture' });
  }

  db.setter(username, 'profilePicturePath', fileName);
  const profilePicturePath = fileName;
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
    { $push: { picturesPath: newname } });
  const picturesPath = userdb.picturesPath;
  picturesPath.push(newname);
  return res.send({ error: '', picturesPath });
};

export { nbVerif, upload, remove, favorite };
