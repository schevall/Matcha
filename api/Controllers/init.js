import fs from 'fs';
import sharp from 'sharp';
import Mongo from '../config/MongoConnection';

const makeModel = ({ username, birthDate, gender, orient, tags, bio, geo }) => (
  {
    activated: true,
    username,
    birthDate,
    gender,
    password: '$2a$10$sgKhWENdZurYDYeUHRJ2Bu56Pzqur46OH4N/oB0l9Q6akJ.S/H2OW',
    email: 'sim.chvll@gmail.com',
    activationkey: '',
    lastConnection: '',
    picturesPath: [],
    profilePicturePath: '',
    orient,
    popularity: 0,
    firstname: '',
    lastname: '',
    geo,
    tags,
    likedby: [],
    liketo: [],
    blockedby: [],
    blockedto: [],
    reportedby: [],
    reportedto: [],
    notification: [],
    activity: [],
    oldactivity: [],
    conversations: null,
    bio,
  }
);

const users = [
  {
    username: 'Daenerys',
    birthDate: new Date(1995, 11, 17),
    gender: 'female',
    orient: 'male',
    tags: ['dragon', 'incest', 'blond'],
    bio: '',
    geo: '45.8833,3.2667',
  },
  {
    username: 'Sansa',
    birthDate: new Date(1998, 11, 17),
    gender: 'female',
    orient: 'male',
    tags: ['north', 'redhead', 'winter'],
    bio: '',
    geo: '44.8833,0.2667',
  },
  {
    username: 'Arya',
    birthDate: new Date(2000, 11, 17),
    gender: 'female',
    orient: 'male',
    tags: ['north', 'winter', 'fighter'],
    bio: '',
    geo: '49.8833,1.2667',
  },
  {
    username: 'Cersei',
    birthDate: new Date(1989, 11, 17),
    gender: 'female',
    orient: 'male',
    tags: ['rich', 'summer', 'incest', 'blond'],
    bio: '',
    geo: '41.8833,5.2667',
  },
  {
    username: 'Tyrion',
    birthDate: new Date(1991, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['rich', 'imp', 'blond'],
    bio: '',
    geo: '45.8833,3.2667',
  },
  {
    username: 'Jaimy',
    birthDate: new Date(1989, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['fighter', 'incest', 'blond', 'rich'],
    bio: '',
    geo: '41.80,5.20',
  },
  {
    username: 'John',
    birthDate: new Date(1998, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['fighter', 'incest', 'north'],
    bio: '',
    geo: '42.80,3.20',
  },
  {
    username: 'Drogo',
    birthDate: new Date(1989, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['fighter', 'savage', 'poney'],
    bio: '',
    geo: '8.80,21.20',
  },
];

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

const init = async (req, res) => {
  await Mongo.db.collection('users').deleteMany({});
  for (const user of users) {
    const model = makeModel(user);
    const { username } = model;
    const oldpath = `../Characters/${username}.png`;
    const time = new Date().getTime() / 1000;
    const newname = `${time}_${username}.jpeg`;
    model.profilePicturePath = newname;
    sharp(oldpath).resize(200, 200).toFile(`./uploads/${username}/${newname}`);
    Mongo.db.collection('users').insertOne(model);
  }
  return res.send({ error: '' });
};

export default init;
