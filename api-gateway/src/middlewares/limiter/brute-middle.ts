// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response } from 'express';
// import * as expressBrute from 'express-brute';
// import * as winston from 'winston';

// @Injectable()
// export class BruteMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: () => void) {
//     // Aquí puede agregar su lógica de middleware.
    
// const bruteforce = new expressBrute(new expressBrute.MemoryStore(), {
//     freeRetries: 3,
//     minWait: 5*60*1000,
//     maxWait: 60*60*1000,
//     failCallback: function (req, res, next, nextValidRequestDate) {
//       winston.error(`Too many failed attempts to sign in for user ${req.body.username}`);
//       res.status(401).json({ message: 'Too many failed attempts to sign in. Please try again later.' });
//     }
//   });
//     next();
//   }
// }
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as expressBrute from 'express-brute';
import { sendManyFailsEmail } from '../../common/sendMail/manyfails.mail';

const store = new expressBrute.MemoryStore();

const bruteforce = new expressBrute(store, {
  freeRetries: 300000,
  minWait: 5*60*1000,
  maxWait: 60*60*1000,
  failCallback: function (req, res, next, nextValidRequestDate) {
    console.log(`Too many failed attempts to sign in for user`);
    res.status(401).json({ message: 'Too many failed attempts to sign in. Please try again later.' });

    //send mail
    sendManyFailsEmail();
  }
});

@Injectable()
export class BruteMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    bruteforce.prevent(req, res, next);
  }
}
