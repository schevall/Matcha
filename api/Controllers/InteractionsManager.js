import * as db from '../DbAction/DbAction.js';

const lookup = () => {

}

export const like = async (req, res) => {
  const { visitor, target } = req.body;
  console.log('in likes', visitor, target);
  const visitorDb = await db.getUserdb(visitor);
  const targetDb = await db.getUserdb(target);
  const visitorLikedby = visitorDb.likedby;
  const visitorLiketo = visitorDb.liketo;
  const targetLikedby = targetDb.likedby;
  const targetLiketo = targetDb.liketo;

  if (visitorLiketo.includes(target)) {
    return res.send({ error: 'like', message: `You allready like ${target} !` });
  } else if (targetLiketo.includes(visitor)) {
    return res.send({ error: 'like', message: `You allready like ${target} !` });
  }
  db.pusher(visitor, 'liketo', target);
  db.pusher(target, 'likedby', visitor);
  return res.send({ error: '' });
};

export const unlike = (req, res) => {

};
