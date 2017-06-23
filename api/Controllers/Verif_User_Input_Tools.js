function verifusername(username) {
  if (!(username.length >= 4 && username.length <= 12)) {
    return 'username should be between 4 and 12 characters long.';
  }
  const reg = /^[a-zA-Z0-9]+$/;
  if (!username.match(reg)) {
    return 'username should contain only alphanumeric characters.';
  }
  return false;
}

function verifpasswd(password, password1) {
  if (password !== password1) {
    return 'The passwords given are differents.';
  }
  const reg = /^(?=.*[0-9])[a-zA-Z0-9]{6,24}$/;
  if (!password.match(reg)) {
    return 'Password should contain at least 1 digit and 1 letter and be between 6 and 24 characters long.';
  }
  return false;
}

function verifemail(email) {
  const reg = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  if (!email.match(reg)) {
    return 'The given email is invalid';
  }
  return false;
}

const VerifUserSignin = (req) => {
  const verif = {
    success: false,
    message: [],
  };
  const error = [];
  error.push(verifusername(req.username));
  error.push(verifpasswd(req.password, req.password1));
  error.push(verifemail(req.email));
  error.forEach((item) => {
    if (item) {
      verif.message.push(item);
    }
  });
  if (verif.message.length === 0) {
    verif.success = true;
  }
  return (verif);
};

export default VerifUserSignin;
