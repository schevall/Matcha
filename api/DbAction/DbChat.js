import Mongo from '../config/MongoConnection';

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
  const chat = await getChat(author, target);
  if (!chat) {
    await Mongo.db.collection('chat').insertOne({
      user1: author,
      user2: target,
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

export const getAllConversations = async () => {

};
