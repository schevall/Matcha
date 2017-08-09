import * as db from '../DbAction/DbChat.js';

export const inputMessage = async (req, res) => {
  const { username } = req.headers;
  const { target, input } = req.body;
  console.log('kfjkdjg', target);
  await db.pushNewMessage(username, target, input);
  return res.send({ error: '' });
};

export const getConversations = (req, res) => {
  return res.send({ error: '' });
};

export const getMessages = (req, res) => {
  return res.send({ error: '' });
};
