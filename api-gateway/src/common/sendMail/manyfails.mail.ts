const nodemailer = require('nodemailer');
async function sendManyFailsEmail() {
    const subject = `Many Auth Fails Alert!`;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'santanajeankarlo@gmail.com',
        pass: 'gpuhmzpnxwnngdmq'
      }
    });
    let mailOptions = {
      from: 'santanajeankarlo@gmail.com',
      to: 'romerojeankarlo14@gmail.com',
      subject: subject,
      text: 'Someone is trying to authenticate and has failed many times!'
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });  
  }

  export {sendManyFailsEmail};
  