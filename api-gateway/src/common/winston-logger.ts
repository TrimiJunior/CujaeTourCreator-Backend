import * as winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'auth.log' })
  ]
});

export {logger};
