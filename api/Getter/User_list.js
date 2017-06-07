import Mongo from '../config/MongoConnection';

const showusers = async (req, res) => {
  const all = await Mongo.db.collection('users').find().toArray();
  return res.json({ all }).end();
};

export default showusers;
