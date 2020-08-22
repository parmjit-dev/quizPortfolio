const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  /**
   *  create transporter
   *
   * define the email options
   *
   * Actually sned the email
   */

  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    // auth: {
    //   user: process.env.EMAIL_USERNAME,
    //   pass: process.env.EMAIL_PASSWORD,
    // },
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '89722398d21068',
      pass: '2eb674f34f3877',
    },
    // need to activate less secure app option
    // use cengrit or gunmail for production as gmail is not a good option for production
    // mailtrap is a safe email testing site -- so you don't send dev emais to user
  });

  const mailOptions = {
    from: 'Parmjit Singh <parmjit@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: doing it later
  };

  await transporter.sendMail(mailOptions);
  // awaits the transport to send the email object with the details inputed
};

module.exports = sendEmail;