import * as db from '../DbAction/DbAction.js';
import { calculateAge } from '../Tools/DateTools.js';
import { CountCommonTags, getDistance } from '../Tools/InteractionsTools.js';
import { GetMatchingScore, TagMatch } from '../Tools/MatchingTool.js';

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

const getMatch = (username) => {
  const match = {
    $and: [
    { username: { $ne: username } },
    { profilePicturePath: { $ne: '' } },
    { blockedto: { $ne: username } },
    { blockedby: { $ne: username } },
    ] };
  return match;
};

const filterSearch = ({ searchTag = [], Age, Distance, Tags, Popularity, Matching }, users = [], initiator) => {
  const result = users.map((user) => {
    const age = calculateAge(user.birthDate);
    const distance = getDistance(user.geo, initiator.geo);
    const communTag = CountCommonTags(user.tags, initiator.tags);
    const popularity = user.popularity;
    const matching = GetMatchingScore(user, initiator);
    if ((age >= Age.min && age <= Age.max) || Age.max === 100) {
      if (distance >= Distance.min * 1000 && (distance <= Distance.max * 1000 || Distance.max === 100)) {
        if (communTag >= Tags.min && communTag <= Tags.max) {
          if (popularity >= Popularity.min && (popularity <= Popularity.max || Popularity.max === 20)) {
            if (matching >= Matching.min && (matching <= Matching.max || Matching === 20)) {
              if (!searchTag || TagMatch(searchTag, user.tags)) {
                return user;
              }
            }
          }
        }
      }
    }
    return null;
  });
  const output = result.filter(n => (n !== undefined && n !== null));
  return output;
};

const search = async (req, res) => {
  const { username } = req.headers;
  const { usercollection, userdb } = await db.serveDb(username);
  const { searchParams } = req.body;
  const match = getMatch(username);
  const project = getProj();
  const result = usercollection.aggregate(
    [
      { $match: match },
      { $project: project },
    ]);
  const users = await result.toArray();
  result.close();
  const filtered = filterSearch(searchParams, users, userdb);
  return res.send({ error: '', search: filtered });
};

export default search;
