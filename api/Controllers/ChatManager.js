import {
   getChat,
   getConversations,
   pushNewMessage,
   getMessageCount,
   resetMessageCount,
} from '../DbAction/DbChat.js';
import * as db from '../DbAction/DbAction.js';

export const inputMessage = async (req, res) => {
  const { username } = req.headers;
  const { target, input } = req.body;
  await pushNewMessage(username, target, input);
  return res.send({ error: '' });
};

export const getAllConversations = async (req, res) => {
  const { username } = req.headers;
  const output = await getConversations(username);
  const visitordb = await db.getUserdb(username);
  console.log('conversations', output);
  console.log('visitordb', visitordb);
  const conversations = output.map((el) => {
    if (!visitordb.blockedto.includes(el.user1) && !visitordb.blockedto.includes(el.user2)) {
      if (!visitordb.blockedby.includes(el.user1) && !visitordb.blockedby.includes(el.user2)) {
        if (visitordb.liketo.includes(el.user1) || visitordb.liketo.includes(el.user2)) {
          if (visitordb.likedby.includes(el.user1) || visitordb.likedby.includes(el.user2)) {
            return el;
          }
        }
      }
    }
    return 'blocked';
  });
  return res.send({ error: '', conversations });
};

export const getMessages = async (req, res) => {
  const { username } = req.headers;
  const { target } = req.params;
  const visitordb = await db.getUserdb(username);
  const targetdb = await db.getUserdb(target);
  if (visitordb.blockedby.includes(target)) return res.send({ error: 'blocked' });
  if (!targetdb.liketo.includes(username) || !visitordb.liketo.includes(target)) return res.send({ error: 'nomatch' });
  const chat = await getChat(username, target);
  resetMessageCount(username, target);
  return res.send({ error: '', message: chat });
};

export const getNewMessageCount = async (req, res) => {
  const { username } = req.headers;
  const messageCount = await getMessageCount(username);
  if (messageCount === null) return res.send({ error: 'MessageCount', message: 'No conversations' });
  return res.send({ error: '', messageCount });
};

export const updateMessageCount = async (req, res) => {
  const { username } = req.headers;
  const { target } = req.params;
  const chat = await getChat(username, target);
  if (!chat) {
    return res.send({ error: 'updateMessageCount', message: 'No conversations' });
  }
  const erased = await resetMessageCount(username, target);
  return res.send({ error: '', erased });
};
