const nodemailer = require('nodemailer');
async function sendEmail(userEmail, username) {
    const nombre = username;
    const subject = `Bienvenido a Cujae Virtual Tour, ${nombre}!`;
  
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
      text: 'Thank you for registering with us!'
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });  
  }

  export {sendEmail};
  