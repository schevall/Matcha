const subject = () => {
  const sub = 'Your password has been reset';
  return sub;
};

const ftext = (username, key) => {
  const text = `Hi ${username}!
  Your password has been reset :
  the new Password ! => ${key}`;
  return text;
};

const fhtml = (username, key) => {
  const html = `<div><p>Hi ${username}!</p><p>Your password has been reset :</p><p>the new Password ! => ${key}</p></div>`;
  return html;
};

export { ftext, fhtml, subject };
