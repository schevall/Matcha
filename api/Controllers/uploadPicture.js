import fs from 'fs';
import sharp from 'sharp';
import Mongo from '../config/MongoConnection';

const uploadPicture = async (req, res) => {

  const { path } = req.file;
  const { username, numberOfPictures } = req.headers;

  console.log('in upload api, path = ', path);

  const usercollection = await Mongo.db.collection('users');
  const userdb = await usercollection.findOne({ username });
  if (!userdb) {
    fs.unlinkSync(path)
    return res.send({error: 'upload error', message: 'User not found in db'});
  }

  const userdir = `./uploads/${username}`;
  if (!fs.existsSync(userdir)){
      fs.mkdirSync(userdir);
  }
  const time = new Date().getTime() / 1000;
  const newname = time + '_' + username;
  const newpath = `${userdir}/${newname}.jpeg`;

  await sharp(path).resize(240, 320).toFile(newpath);
  fs.unlinkSync(`./${path}`);


  await usercollection.updateOne(
    {username},
    {$push:{
      photoUrl: newpath}});
  return res.send({error: '', newpath,  numberOfPictures});
};

export default uploadPicture;
