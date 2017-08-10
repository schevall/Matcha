import { getChat, getConversations, pushNewMessage } from '../DbAction/DbChat.js';
import * as db from '../DbAction/DbAction.js';

export const inputMessage = async (req, res) => {
  const { username } = req.headers;
  const { target, input } = req.body;
  console.log('kfjkdjg', target);
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
  console.log('TO ARRAY', conversations);
  return res.send({ error: '', conversations });
};

export const getMessages = async (req, res) => {
  const { username } = req.headers;
  const { target } = req.params;
  console.log('Get Messages', username, target);
  const message = await getChat(username, target);
  console.log('getMessages', message);
  return res.send({ error: '', message });
};
