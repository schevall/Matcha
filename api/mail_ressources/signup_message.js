const subject = () => {
  const sub = 'Last step for your subcription to Matcha !';
  return sub;
};

const ftext = (username, key) => {
  const text = `Hi there ${username}!
  We are pleased to welcome you to our great new website
  To activate your account, just enter this key in your profile page
  the key ! => ${key}`;
  return text;
};

const fhtml = (username, key) => {
  const html = `<div><p>Hi there ${username}!</p><p>We are pleased to welcome you to our great new website</p><p>To activate your account, just enter this key in your profile page</p><p>the key ! => ${key}</p></div>`;
  return html;
};

export { ftext, fhtml, subject };
