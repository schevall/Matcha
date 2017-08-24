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
  const userdb = await db.getUserdb(username);
  const { blockedto, blockedby } = userdb;
  const conversations = output.map((el) => {
    if (!blockedto.includes(el.user1) && !blockedto.includes(el.user1)) {
      if (!blockedby.includes(el.user1) && !blockedby.includes(el.user1)) {
        return el;
      }
    }
    return 'blocked';
  });
  return res.send({ error: '', conversations });
};

export const getMessages = async (req, res) => {
  const { username } = req.headers;
  const { target } = req.params;
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
