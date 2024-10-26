const nodemailer = require('nodemailer');

async function sendAcceptEmail(userEmail) {
  const subject = `Aviso Importante: Su Visita Virtual ha sido Aprobada`;

  const message = `Estimado ${userEmail},

Nos alegra informarle que su Visita Virtual ha sido aprobada en nuestro sitio, 
debido a que cumple con nuestros estándares de calidad y política.

Atentamente,
El Equipo de Moderación de Cujae Virtual Tour`;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'santanajeankarlo@gmail.com',
      pass: 'gpuhmzpnxwnngdmq',
    },
  });

  let mailOptions = {
    from: 'santanajeankarlo@gmail.com',
    to: userEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export { sendAcceptEmail };
