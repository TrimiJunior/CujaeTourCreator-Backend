const nodemailer = require('nodemailer');

async function newProjectMail(userEmail) {
  const subject = `Nuevo Projecto`;

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
    text: 'Tiene un nuevo proyecto en la lista de proyectos por validar',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export { newProjectMail };
