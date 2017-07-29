import * as db from '../DbAction/DbAction.js';

export const like = async (req, res) => {
  const { visitor, target } = req.body;
  console.log('in likes', visitor, target);
  const visitorDb = await db.getUserdb(visitor);
  const visitorLiketo = visitorDb.liketo;

  if (visitorLiketo.includes(target)) {
    return res.send({ error: 'like', message: `You allready like ${target} !` });
  }

  db.pusher(visitor, 'liketo', target);
  db.pusher(target, 'likedby', visitor);
  const targetDb = await db.getUserdb(target);
  const targetLiketo = targetDb.liketo;
  if (!targetLiketo.includes(visitor)) {
    const newactions = { canlike: false };
    return res.send({ error: '', newactions, message: `You have liked ${target} !` });
  }
  const newactions = { canlike: false, canchat: true };
  return res.send({ error: '', newactions, message: `You have liked ${target} and it's a Match, Congrats !!!` });
};

export const unlike = async (req, res) => {
  const { visitor, target } = req.body;
  console.log('in unlike', visitor, target);
  const visitorDb = await db.getUserdb(visitor);
  const visitorLiketo = visitorDb.liketo;

  if (!visitorLiketo.includes(target)) {
    return res.send({ error: 'like', message: 'You can only unlike people you already like !' });
  }
  db.puller(visitor, 'liketo', target);
  db.puller(target, 'likedby', visitor);
  const targetDb = await db.getUserdb(target);
  const targetLiketo = targetDb.liketo;
  if (!targetLiketo.includes(visitor)) {
    const newactions = { canlike: false };
    return res.send({ error: '', newactions, message: `You have unliked ${target} !` });
  }
  const newactions = { canlike: true, canchat: false };
  return res.send({ error: '', newactions, message: `You have unliked ${target}, then the match is canceled` });
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
