import bcrypt from 'bcrypt-nodejs';

class User {

  static make_hash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }

  static compare_password(password, dbpassword) {
    return bcrypt.compareSync(password, dbpassword);
  }

  static make_activationkey(nb) {
    const table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*!';
    const length = table.length;
    let out = '';
    for (let i = 0; i < nb; i++) {
      out += table.charAt(Math.floor(Math.random() * length));
    }
    return out;
  }

  static create(username, email, password) {
    let newpassword = this.make_hash(password);
    let activationkey = this.make_activationkey(24);
    return ({
      username,
      password: newpassword,
      email,
      activationkey,
      photoUrl: [],
    });
  }
}

export default User;
