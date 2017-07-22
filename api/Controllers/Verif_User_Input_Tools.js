export function verifusername(username) {
  if (!(username.length >= 4 && username.length <= 20)) {
    const message = 'Username should be between 4 and 20 characters long.';
    const error = { error: 'errorUsername', message };
    return error;
  }
  const reg = /^[a-zA-Z0-9]+$/;
  if (!username.match(reg)) {
    const message = 'Username should contain only alphanumeric characters.';
    const error = { error: 'errorUsername', message };
    return error;
  }
  return null;
}

export function verifpasswd(password, password2) {
  if (password !== password2) {
    const message = 'The passwords given are differents.';
    const error = { error: 'errorPassword2', message };
    return error;
  }
  const reg = /^(?=.*[0-9])[a-zA-Z0-9]{6,24}$/;
  if (!password.match(reg)) {
    const message = 'Password should contain at least 1 digit and 1 letter and be between 6 and 24 characters long.';
    const error = { error: 'errorPassword', message };
    return error;
  }
  return null;
}

export function verifemail(email) {
  const reg = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  if (!email.match(reg)) {
    const message = 'The given email is invalid';
    const error = { error: 'errorEmail', message };
    return error;
  }
  return null;
}

export function verifage(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  if (age < 18) {
    const message = 'You must be at least 18 years old, come back later !';
    const error = { error: 'errorBirthDate', message };
    return error;
  }
  return null;
}

export const VerifUserSignin = (req) => {
  const verif = {
    success: true,
    output: [],
  };

  verif.output.push(verifusername(req.username));
  verif.output.push(verifpasswd(req.password, req.password2));
  verif.output.push(verifemail(req.email));
  verif.output.push(verifage(req.birthDate));
  verif.output.forEach((item) => {
    if (item) {
      verif.success = false;
    }
  });
  return (verif);
};
