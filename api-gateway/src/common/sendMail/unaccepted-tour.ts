const nodemailer = require('nodemailer');

async function sendRejectEmail(userEmail) {
  const subject = `Aviso Importante: Su Visita Virtual no ha sido Aprobada`;

  const rejectionReasons = [
    'Contenido inapropiado u ofensivo.',
    'Información falsa o engañosa.',
    'Calidad de las imágenes insatisfactoria.',
    'Falta de información relevante.',
  ];

  const reasonsList = rejectionReasons
    .map((reason, index) => `${index + 1}. ${reason}`)
    .join('\n');

  const message = `Estimado ${userEmail},

Lamentamos informarle que su Visita Virtual no ha sido aprobada en nuestro sitio.
Hemos identificado algunos aspectos que necesitan ajustes para cumplir con nuestros
estándares de calidad y política.

Motivos para la No Aprobación:
${reasonsList}

Le recomendamos revisar y mejorar los puntos mencionados antes de volver a presentar
su Visita Virtual. Apreciamos su comprensión y esfuerzos para mantener la calidad de
nuestro contenido.

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

export { sendRejectEmail };
