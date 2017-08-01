import * as db from '../DbAction/DbAction.js';

export const like = async (req, res) => {
  const { visitor, target } = req.body;
  console.log('in likes', visitor, target);
  const visitorDb = await db.getUserdb(visitor);
  const visitorLiketo = visitorDb.liketo;
  const targetDb = await db.getUserdb(target);

  if (visitorLiketo.includes(target)) {
    return res.send({ error: 'like', message: `You allready like ${target} !` });
  }

  await db.pusher(visitor, 'liketo', target);
  await db.pusher(target, 'likedby', visitor);
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
  await db.puller(visitor, 'liketo', target);
  await db.puller(target, 'likedby', visitor);
  const targetDb = await db.getUserdb(target);
  const targetLiketo = targetDb.liketo;
  if (!targetLiketo.includes(visitor)) {
    const newactions = { canlike: true };
    return res.send({ error: '', newactions, message: `You have unliked ${target} !` });
  }
  const newactions = { canlike: true, canchat: false };
  return res.send({ error: '', newactions, message: `You have unliked ${target}, then the match is canceled` });
};

export const block = async (req, res) => {
  const { visitor, target } = req.body;
  console.log('in block', visitor, target);
  const visitorDb = await db.getUserdb(visitor);
  const visitorBlockedto = visitorDb.blockedto;
  console.log('BLOCKED', visitorBlockedto);

  if (visitorBlockedto.includes(target)) {
    return res.send({ error: 'block', message: 'You cannot double block someone !' });
  }
  db.puller(visitor, 'liketo', target);
  db.puller(target, 'likedby', visitor);
  db.pusher(visitor, 'blockedto', target);
  db.pusher(target, 'blockedby', visitor);
  const newactions = { canblock: false, canlike: 'disabled', canchat: 'disabled' };
  return res.send({ error: '', newactions, message: `You have blocked ${target}, then he/she cannot either see or interact with you` });
};

export const unblock = async (req, res) => {
  const { visitor, target } = req.body;
  console.log('in unblock', visitor, target);
  const visitorDb = await db.getUserdb(visitor);
  const visitorBlockedto = visitorDb.blockedto;

  if (!visitorBlockedto.includes(target)) {
    return res.send({ error: 'unblock', message: 'You cannot unblock someone you did not block !' });
  }
  db.puller(visitor, 'blockedto', target);
  db.puller(target, 'blockedby', visitor);
  const newactions = { canblock: true, canlike: true };
  return res.send({ error: '', newactions, message: `You have unblocked ${target} !` });
};

export const report = async (req, res) => {
  const { visitor, target } = req.body;
  const visitorDb = await db.getUserdb(visitor);
  const visitorReportedto = visitorDb.reportedto;

  if (visitorReportedto.length && !visitorReportedto.includes(target)) {
    return res.send({ error: 'report', message: 'You cannot double report someone !' });
  }
  db.pusher(visitor, 'reportedto', target);
  db.pusher(target, 'reportedby', visitor);
  const newactions = { canreport: false };
  return res.send({ error: '', newactions, message: `You have reported ${target}, we will examine this profile shortly !` });
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
