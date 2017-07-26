import * as db from '../DbAction/DbAction.js';

export const like = async (req, res) => {
  const { visitor, target } = req.body;
  console.log('in likes', visitor, target);
  const visitorDb = await db.getUserdb(visitor);
  const visitorLiketo = visitorDb.liketo;

  if (visitorLiketo.includes(target)) {
    return res.send({ error: 'like', message: `You allready like ${target} !` });
  }
  await db.pusher(visitor, 'liketo', target);
  await db.pusher(target, 'likedby', visitor);
  const field = 'canlike';
  const newstatut = false;
  return res.send({ error: '', field, newstatut, message: `You have liked ${target} !` });
};

export const unlike = async (req, res) => {
  const { visitor, target } = req.body;
  console.log('in unlike', visitor, target);
  const visitorDb = await db.getUserdb(visitor);
  const visitorLiketo = visitorDb.liketo;

  if (!visitorLiketo.includes(target)) {
    return res.send({ error: 'like', message: 'You can only unlike people you already like !' });
  }
  await db.puller(visitor, 'liketo', target);
  await db.puller(target, 'likedby', visitor);
  const field = 'canlike';
  const newstatut = true;
  return res.send({ error: '', field, newstatut, message: `You have unliked ${target} !` });
};

export const block = (req, res) => {

};

export const unblock = (req, res) => {

};

export const report = (req, res) => {

};

export const actionGateway = (req, res) => {
  const { action } = req.body;
  console.log('gateway action', action);
  if (action === 'like') return like(req, res);
  else if (action === 'unlike') return unlike(req, res);
  else if (action === 'block') return block(req, res);
  else if (action === 'unblock') return unblock(req, res);
  else if (action === 'report') return report(req, res);
  return res.send({ error: 'no action', message: 'this action does not affect' });
};
