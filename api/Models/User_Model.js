import bcrypt from 'bcrypt-nodejs';

class User {

  static makeHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }

  static comparePassword(password, dbpassword) {
    console.log('in comparePassword pass', password);
    console.log('in comparePassword dbpass', dbpassword);
    return bcrypt.compareSync(password, dbpassword);
  }

  static makeActivationkey(nb) {
    const table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*!';
    const length = table.length;
    let out = '';
    for (let i = 0; i < nb; i += 1) {
      out += table.charAt(Math.floor(Math.random() * length));
    }
    return out;
  }

  static create(username, email, password, birthDate, gender) {
    const newpassword = this.makeHash(password);
    const activationkey = this.makeActivationkey(24);
    return ({
      activated: false,
      username,
      birthDate,
      gender,
      password: newpassword,
      email,
      activationkey,
      logged: false,
      lastConnection: '',
      picturesPath: [],
      profilePicturePath: '',
      orient: 'both',
      popularity: 0,
      firstname: '',
      lastname: '',
      geo: '',
      tags: [],
      likedby: [],
      liketo: [],
      notification: [],
      bio: '',
    });
  }
}

export default User;
