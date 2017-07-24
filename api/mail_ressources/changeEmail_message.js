const subject = () => {
  const sub = 'Your email has been changed';
  return sub;
};

const ftext = (username, key) => {
  const text = `Hi there ${username}!
  You have succesfully changed your email.
  To Reactivate your account, just enter this key at /activation.
  the key ! => ${key}`;
  return text;
};

const fhtml = (username, key) => {
  const html = `<div><p>Hi there ${username}!</p><p>You have succesfully changed your email.</p><p>To Reactivate your account, just enter this key at /activation.</p><p>the key ! => ${key}</p></div>`;
  return html;
};

export { ftext, fhtml, subject };
