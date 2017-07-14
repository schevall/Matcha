import Mongo from '../config/MongoConnection';
import Verif from './Verif_User_Input_Tools';
import User from '../Models/User_Model';

const signup = async (req, res) => {
  // verification on the User input
  let verif = await Verif(req.body);
  if (verif.success === false) {
    return res.send({ verif });
  }

  // extraction of info from request and verification that no user allready exist with that username
  const { username, email, password, age, gender } = req.body;
  const usersCollection = await Mongo.db.collection('users');
  const user = await usersCollection.findOne({ username });

  if (user) {
    verif = {
      success: false,
      output: [{
        error: 'errorUsername',
        message: 'This username already exists.',
      }],
    };
    return res.send({ verif });
  }

  const newUser = User.create(username, email, password, age, gender);
  await usersCollection.insertOne(newUser);
  return res.send({ verif });
};


export default signup;
