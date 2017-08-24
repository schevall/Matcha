import Mongo from '../config/MongoConnection';
import * as db from './DbAction.js';

export const getChat = async (user1, user2) => {
  try {
    const chats = await Mongo.db.collection('chat').findOne(
      { $or: [{ user1, user2 }, { user1: user2, user2: user1 }] },
    );
    return chats;
  } catch (err) {
    console.log('Error', err);
    return null;
  }
};

export const pushNewMessage = async (author, target, message) => {
  const picAuthor = await db.getPic(author);
  const picTarget = await db.getPic(target);
  const chat = await getChat(author, target);
  if (!chat) {
    await Mongo.db.collection('chat').insertOne({
      user1: author,
      user2: target,
      picUser1: picAuthor,
      picUser2: picTarget,
      newMessage1: 0,
      newMessage2: 1,
      conversation: [{
        date: Date.now(),
        author,
        message,
      }],
    });
  } else {
    const id = chat._id;
    const conversation = await getChat(author, target);
    const field = conversation.user1 === author ? 'newMessage2' : 'newMessage1';
    await Mongo.db.collection('chat').updateOne(
      { _id: id },
      { $push: { conversation: { date: Date.now(), author, message } } },
    );
    await Mongo.db.collection('chat').updateOne(
      { _id: id },
      { $inc: { [field]: 1 } },
    );
  }
};

export const getConversations = async (user1) => {
  try {
    const conversations = await Mongo.db.collection('chat').find(
      { $or: [{ user1 }, { user2: user1 }] },
    ).toArray();
    return conversations;
  } catch (err) {
    console.log('Error', err);
    return null;
  }
};

export const getMessageCount = async (user1) => {
  const conversations = await getConversations(user1);
  let count = 0;
  conversations.forEach((el) => {
    if (user1 === el.user1) count += el.newMessage1;
    else if (user1 === el.user2) count += el.newMessage2;
  });
  return count;
};

export const resetMessageCount = async (reader, target) => {
  const chat = await getChat(reader, target);
  const id = chat._id;
  const field = chat.user1 === reader ? 'newMessage1' : 'newMessage2';
  const erased = chat[field];
  Mongo.db.collection('chat').updateOne(
    { _id: id },
    { $set: { [field]: 0 } },
  );
  return erased;
};

export const createConversation = async (user1, user2) => {
  const chat = await getChat(user1, user2);
  if (!chat) {
    const picUser1 = await db.getPic(user1);
    const picUser2 = await db.getPic(user2);
    await Mongo.db.collection('chat').insertOne({
      user1,
      user2,
      picUser1,
      picUser2,
      newMessage1: 0,
      newMessage2: 0,
      conversation: [],
    });
  }
};
