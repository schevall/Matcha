import nodemailer from 'nodemailer';

const mymailer = (to, text, html, subject) => {
  const stmp = {
    service: 'gmail',
    auth: {
      user: 'sim.chvlll',
      pass: 'Antologi1',
    },
  };
  const transporter = nodemailer.createTransport(stmp);
  const mailOptions = {
    from: 'Matcha@gmail.com',
    to,
    subject,
    text,
    html,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    console.log(err || info);
  });
};


export default mymailer;
