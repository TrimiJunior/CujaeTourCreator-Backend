const { createLogger, transports, format } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    transports: [
//     new transports.File({
//       filename: 'logs/access.log',
//       level: 'info',
//       format: combine(timestamp(), myFormat)
//     }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(timestamp(), myFormat)
    })
  ]
});

module.exports = logger;
