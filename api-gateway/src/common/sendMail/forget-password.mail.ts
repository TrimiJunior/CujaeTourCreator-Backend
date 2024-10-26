const nodemailer = require('nodemailer');
// import { generateVerificationCode } from './code.gen';

async function sendCodeEmail(userEmail, code) {
    const subject = `Bienvenido a Cujae Virtual Tour!`;
  
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'santanajeankarlo@gmail.com',
        pass: 'gpuhmzpnxwnngdmq'
      }
    });
    let mailOptions = {
      from: 'santanajeankarlo@gmail.com',
      to: userEmail,
      subject: subject,
      text: 'Code: ' + code,
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });  
  }

  export {sendCodeEmail};
  