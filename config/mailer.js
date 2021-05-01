const nodemailer = require('nodemailer');

const sendEmail = async (subject, body) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'haczclub@gmail.com',
        pass: 'Ashujhalli'
      }
    });

    var mailOptions = {
      from: 'haczclub@gmail.com',
      to: 'henryroy40@gmail.com',
      subject: subject,
      text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        resolve(false);
      } else {
        console.log('Email sent: ' + info.response);
        resolve(true);
      }
    });
  });
}

module.exports = sendEmail