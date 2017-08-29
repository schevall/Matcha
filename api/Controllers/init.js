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
    lastConnection: Date.now(),
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
    geo: '45.8,3.26',
  },
  {
    username: 'Sansa',
    birthDate: new Date(1998, 11, 17),
    gender: 'female',
    orient: 'male',
    tags: ['north', 'redhead', 'winter'],
    bio: '',
    geo: '45.83,3.2',
  },
  {
    username: 'Arya',
    birthDate: new Date(2000, 11, 17),
    gender: 'female',
    orient: 'male',
    tags: ['north', 'winter', 'fighter'],
    bio: '',
    geo: '45.81,3.28',
  },
  {
    username: 'Cersei',
    birthDate: new Date(1989, 11, 17),
    gender: 'female',
    orient: 'male',
    tags: ['rich', 'summer', 'incest', 'blond'],
    bio: '',
    geo: '45.89,3.20',
  },
  {
    username: 'Tyrion',
    birthDate: new Date(1991, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['rich', 'imp', 'blond'],
    bio: '',
    geo: '45.85,3.22',
  },
  {
    username: 'Jaimy',
    birthDate: new Date(1989, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['fighter', 'incest', 'blond', 'rich'],
    bio: '',
    geo: '45.86,3.24',
  },
  {
    username: 'John',
    birthDate: new Date(1998, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['fighter', 'incest', 'north'],
    bio: '',
    geo: '45.88,3.22',
  },
  {
    username: 'Drogo',
    birthDate: new Date(1989, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['fighter', 'savage', 'poney'],
    bio: '',
    geo: '45.84,3.26',
  },
];

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = `${path}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const init = async (req, res) => {
  await Mongo.db.collection('users').deleteMany({});
  deleteFolderRecursive('./uploads');
  fs.mkdirSync('./uploads');
  const array = [];
  for (const user of users) {
    const model = makeModel(user);
    const { username } = model;
    console.log('IN FOR username', username);
    const oldpath = `./Characters/${username}.png`;
    const time = new Date().getTime() / 1000;
    const newname = `${time}_${username}.jpeg`;
    fs.mkdirSync(`./uploads/${username}`);
    model.profilePicturePath = newname;
    model.picturesPath.push(newname);
    sharp(oldpath).resize(200, 200).toFile(`./uploads/${username}/${newname}`);
    array.push(model);
  }
  Mongo.db.collection('users').insertMany(array);
  return res.send({ error: '' });
};

export default init;
