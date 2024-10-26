// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { verify } from 'jsonwebtoken';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(401).send({ message: 'Token no proporcionado' });
//     }

//     const token = authHeader.split(' ')[1];
//     try {
//       const decoded = verify(token, 'SECRET_KEY');
//       req.user = decoded;
//       next();
//     } catch (err) {
//       return res.status(401).send({ message: 'Token inválido' });
//     }
//   }
// }
