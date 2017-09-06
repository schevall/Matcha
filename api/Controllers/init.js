import fs from 'fs';
import sharp from 'sharp';
import Mongo from '../config/MongoConnection';

const makeModel = ({ username, birthDate, gender, orient, tags, bio, geo, likedby = [], liketo = [], popularity }) => (
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
    firstname: '',
    lastname: '',
    geo,
    popularity,
    tags,
    likedby,
    liketo,
    blockedby: [],
    blockedto: [],
    reportedby: [],
    reportedto: [],
    notification: [],
    activity: [],
    oldactivity: [],
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
    likedby: ['John', 'Jaimy', 'Tyrion', 'Drogo'],
    liketo: ['John'],
    popularity: 4,
    bio: '',
    geo: '45.8,3.26',
  },
  {
    username: 'Sansa',
    birthDate: new Date(1998, 11, 17),
    gender: 'female',
    orient: 'male',
    tags: ['north', 'redhead', 'winter'],
    likedby: ['Tyrion', 'LittleFinger'],
    liketo: ['Jaimy', 'Drogo'],
    popularity: 2,
    bio: '',
    geo: '45.83,3.2',
  },
  {
    username: 'Arya',
    birthDate: new Date(2000, 11, 17),
    gender: 'female',
    orient: 'male',
    tags: ['north', 'winter', 'fighter'],
    likedby: ['Jaimy'],
    popularity: 1,
    bio: '',
    geo: '45.81,3.28',
  },
  {
    username: 'Cersei',
    birthDate: new Date(1989, 11, 17),
    gender: 'female',
    orient: 'male',
    tags: ['rich', 'summer', 'incest', 'blond', 'plot'],
    likedby: ['Jaimy'],
    liketo: ['John', 'Jaimy', 'Drogo', 'LittleFinger'],
    popularity: 1,
    bio: '',
    geo: '45.89,3.20',
  },
  {
    username: 'Tyrion',
    birthDate: new Date(1991, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['rich', 'imp', 'blond'],
    liketo: ['Daenerys', 'Sansa'],
    popularity: 0,
    bio: '',
    geo: '45.85,3.22',
  },
  {
    username: 'Jaimy',
    birthDate: new Date(1989, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['fighter', 'incest', 'blond', 'rich'],
    likedby: ['Cersei', 'Sansa'],
    liketo: ['Cersei', 'Daenerys', 'Arya'],
    popularity: 2,
    bio: '',
    geo: '45.86,3.24',
  },
  {
    username: 'John',
    birthDate: new Date(1998, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['fighter', 'incest', 'north'],
    likedby: ['Daenerys', 'Cersei'],
    liketo: ['Daenerys'],
    popularity: 2,
    bio: '',
    geo: '45.88,3.22',
  },
  {
    username: 'Drogo',
    birthDate: new Date(1989, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['fighter', 'savage', 'poney'],
    likedby: ['Cersei', 'Sansa'],
    popularity: 2,
    bio: '',
    geo: '45.84,3.26',
  },
  {
    username: 'LittleFinger',
    birthDate: new Date(1984, 11, 17),
    gender: 'male',
    orient: 'female',
    tags: ['rich', 'plot'],
    likedby: ['Cersei'],
    liketo: ['Sansa'],
    popularity: 1,
    bio: '',
    geo: '45.8,3.1',
  },
  {
    username: 'Varys',
    birthDate: new Date(1982, 11, 17),
    gender: 'male',
    orient: 'both',
    tags: ['spider', 'plot'],
    likedby: [],
    liketo: [],
    popularity: 0,
    bio: '',
    geo: '45.44,3.26',
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
  await Mongo.db.collection('tags').deleteMany({});
  await Mongo.db.collection('chat').deleteMany({});
  await deleteFolderRecursive('./uploads');
  fs.mkdirSync('./uploads');
  fs.mkdirSync('./uploads/tmp');
  const array = [];
  const tags = [];
  for (const user of users) {
    const model = makeModel(user);
    const { username } = model;
    const oldpath = `./Characters/${username}.png`;
    const time = new Date().getTime() / 1000;
    const newname = `${time}_${username}.jpeg`;
    fs.mkdirSync(`./uploads/${username}`);
    model.profilePicturePath = newname;
    model.picturesPath.push(newname);
    sharp(oldpath).resize(200, 200).toFile(`./uploads/${username}/${newname}`);
    array.push(model);
    model.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  }
  const userResult = await Mongo.db.collection('users').insertMany(array);
  const tagResult = await Mongo.db.collection('tags').insertOne({ tagList: tags });
  if (userResult.result.ok && tagResult.result.ok) {
    return res.send({ error: '' });
  }
  return res.send({ error: 'oups' });
};

export default init;
