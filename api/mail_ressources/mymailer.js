import nodemailer from 'nodemailer';
import mailAuth from '../config/mailauth.js';

const mymailer = (email, text, html, subject) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.laposte.net',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: mailAuth,
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Matcha42" <Matcha42@laposte.net>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return error;
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return null;
  });
};

export default mymailer;
