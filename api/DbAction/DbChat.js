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
      conversation: [{
        date: Date.now(),
        author,
        message,
      }],
    });
  } else {
    const _id = chat._id;
    await Mongo.db.collection('chat').updateOne(
      { _id },
      { $push: { conversation: { date: Date.now(), author, message } } },
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
