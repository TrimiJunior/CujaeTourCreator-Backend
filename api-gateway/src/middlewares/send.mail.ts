const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const key = require('../credential.json');

const auth = new google.auth.GoogleAuth({
  credentials: key,
  scopes: ['https://www.googleapis.com/auth/gmail.send']
});

const gmail = google.gmail({
  version: 'v1',
  auth: auth
});

function watchLoginErrors() {
  const fileStream = fs.createReadStream('./logger.error');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let loginFailures = 0;

  rl.on('line', (line) => {
    if (line.includes('Faltan campos obligatorios para iniciar sesión.')) {
      loginFailures++;
    }

    if (loginFailures > 5) {
      sendEmailToAdmins();
      loginFailures = 0;
    }
  });

  function sendEmailToAdmins() {
    const message = "Se han producido más de 5 errores de inicio de sesión en el último tiempo.";

    const utf8Subject = `=?utf-8?B?${Buffer.from('Error de inicio de sesión').toString('base64')}?=`;
    const messageParts = [
      'From: Virtual Tour <v-tour-creds@v-tour-384818.iam.gserviceaccount.com>',
      'To: Jean <santanajeankarlo@gmail.com>',
      `Subject: ${utf8Subject}`,
      'Content-Type: text/plain; charset=UTF-8',
      '',
      `${message}`
    ];
    const messageBody = messageParts.join('\n');

    const encodedMessage = Buffer.from(messageBody).toString('base64');

    const gmailOptions: any = { auth: auth };
    gmailOptions['resource'] = {
  raw: encodedMessage
};

    gmail.users.messages.send(gmailOptions, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Correo electrónico enviado.');
      }
    });
  }
}


