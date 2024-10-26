const nodemailer = require('nodemailer');
async function sendSignUpEmail(userEmail, code) {

    let min = 100000;
    let max = 999999;
    let random = Math.floor(Math.random() * (max - min + 1)) + min; 
  
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
      subject: 'Código de verificación de inicio de sesión',
      text: `Su código de verificación es: ${code}`,
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });  

    return random;
  }

  export {sendSignUpEmail};
  