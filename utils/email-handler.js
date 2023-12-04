const nodemailer = require('nodemailer');

const transporter = async (from, to, subject, text) => {
  let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: process.env.NODE_ENV === 'production' ? 465 : 587,
    secure: process.env.NODE_ENV === 'production',
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    text,
  };
  await transport.sendMail(mailOptions);
};

module.exports = transporter;
