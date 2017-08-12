import * as db from '../DbAction/DbAction.js';

const getProj = () => {
  const project = {
    username: 1,
    gender: 1,
    orient: 1,
    profilePicturePath: 1,
    lastConnection: 1,
    liketo: 1,
    likedby: 1,
    blockedto: 1,
    blockedby: 1,
    popularity: 1,
    logged: 1,
    birthDate: 1,
    geo: 1,
    tags: 1,
  };
  return project;
};

const getMatch = (username, gender, orient) => {
  const lookfor = (orient === 'both' ?
  [{ gender: 'male' }, { gender: 'female' }] : [{ gender: orient }]);
  const match = {
    $and: [
    { username: { $ne: username } },
    { $or: lookfor },
    { $or: [{ orient: gender }, { orient: 'both' }] },
    { profilePicturePath: { $ne: '' } },
    { blockedto: { $ne: username } },
    { blockedby: { $ne: username } },
    ] };
  return match;
};

const getGeo = (geo) => {
  const array = geo.split(',');
  array[0] = parseFloat(array[0]);
  array[1] = parseFloat(array[1]);
  console.log('array', array);
  return ({
    near: { type: 'Point', coordinates: array },
    distanceField: 'distance',
    maxDistance: 50 * 1000,
    spherical: true,
  });
};

const getSuggestions = async (req, res) => {
  const { visitor } = req.params;
  const { usercollection, userdb } = await db.serveDb(visitor);
  userdb.email = '';
  const userGender = userdb.gender;
  const userOrient = userdb.orient;
  const match = getMatch(visitor, userGender, userOrient);
  const project = getProj();
  const geo = getGeo(userdb.geo);
  console.log('Geo OBJET', geo);
  const result = usercollection.aggregate(
    [
      { $geoNear: geo },
      { $match: match },
      { $project: project },
    ]);
  const users = await result.toArray();
  result.close();

  return res.send({ error: '', suggestions: users, visitor: userdb });
};

export default getSuggestions;
