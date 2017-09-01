import * as db from '../DbAction/DbAction.js';
import { createConversation } from '../DbAction/DbChat.js';

export const pushActivity = async (target, author, event) => {
  const activity = { author, event, date: Date.now() };
  await db.pusher(target, 'activity', activity);
};

export const like = async (req, res) => {
  const { visitor, target } = req.body;
  const visitorDb = await db.getUserdb(visitor);
  const visitorLiketo = visitorDb.liketo;
  const targetDb = await db.getUserdb(target);

  if (visitorLiketo.includes(target)) {
    return res.send({ error: 'like', message: `You allready like ${target} !` });
  }
  await db.updatePopularity(target, 1);
  await pushActivity(target, visitor, 'like');
  await db.pusher(visitor, 'liketo', target);
  await db.pusher(target, 'likedby', visitor);
  const targetLiketo = targetDb.liketo;
  if (!targetLiketo.includes(visitor)) {
    const newactions = { canlike: false };
    return res.send({ error: '', newactions, message: `You have liked ${target} !` });
  }
  const newactions = { canlike: false, canchat: true };
  await pushActivity(target, visitor, 'match');
  await createConversation(visitor, target);
  return res.send({ error: '', newactions, message: `You have liked ${target} and it's a Match, Congrats !!!` });
};

export const unlike = async (req, res) => {
  const { visitor, target } = req.body;
  const visitorDb = await db.getUserdb(visitor);
  const visitorLiketo = visitorDb.liketo;
  if (!visitorLiketo.includes(target)) {
    return res.send({ error: 'like', message: 'You can only unlike people you already like !' });
  }
  await db.updatePopularity(target, -1);
  await pushActivity(target, visitor, 'unlike');
  await db.puller(visitor, 'liketo', target);
  await db.puller(target, 'likedby', visitor);
  const targetDb = await db.getUserdb(target);
  const targetLiketo = targetDb.liketo;
  if (!targetLiketo.includes(visitor)) {
    const newactions = { canlike: true };
    return res.send({ error: '', newactions, message: `You have unliked ${target} !` });
  }
  await pushActivity(target, visitor, 'unmatch');
  const newactions = { canlike: true, canchat: false };
  return res.send({ error: '', newactions, message: `You have unliked ${target}, then the match is canceled` });
};

export const visitProfile = async (req, res) => {
  const { username } = req.headers;
  const { targeted } = req.params;
  const target = await db.getUserdb(targeted);
  if (!target) {
    return res.send({ error: 'notfound' });
  }
  target.email = '';
  const visitor = await db.getUserdb(username);
  visitor.email = '';
  if (visitor.blockedby.length || target.blockedto.length) {
    if (visitor.blockedby.includes(target.username) || target.blockedto.includes(visitor.username)) {
      return res.send({ error: 'block' });
    }
  }
  await pushActivity(targeted, username, 'visit');
  return res.send({ error: '', target, visitor });
};


export const block = async (req, res) => {
  const { visitor, target } = req.body;
  const visitorDb = await db.getUserdb(visitor);
  const targetDb = await db.getUserdb(target);
  const visitorBlockedto = visitorDb.blockedto;

  if (visitorBlockedto.includes(target)) {
    return res.send({ error: 'block', message: 'You cannot double block someone !' });
  }
  await db.updatePopularity(target, -1);
  await pushActivity(target, visitor, 'block');
  db.puller(visitor, 'liketo', target);
  if (visitorDb.likedby.includes(target)) db.puller(visitor, 'likedby', target);
  if (targetDb.liketo.includes(visitor)) db.puller(visitor, 'liketo', target);
  db.puller(target, 'likedby', visitor);
  db.pusher(visitor, 'blockedto', target);
  db.pusher(target, 'blockedby', visitor);
  const newactions = { canblock: false, canlike: 'disabled', canchat: 'disabled' };
  return res.send({ error: '', newactions, message: `You have blocked ${target}, then he/she cannot either see or interact with you` });
};

export const unblock = async (req, res) => {
  const { visitor, target } = req.body;
  const visitorDb = await db.getUserdb(visitor);
  const visitorBlockedto = visitorDb.blockedto;

  if (!visitorBlockedto.includes(target)) {
    return res.send({ error: 'unblock', message: 'You cannot unblock someone you did not block !' });
  }
  await db.updatePopularity(target, 1);
  await pushActivity(target, visitor, 'unblock');
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
  if (action === 'like') return like(req, res);
  else if (action === 'unlike') return unlike(req, res);
  else if (action === 'block') return block(req, res);
  else if (action === 'unblock') return unblock(req, res);
  else if (action === 'report') return report(req, res);
  return res.send({ error: 'no action', message: 'this action does not affect' });
};
