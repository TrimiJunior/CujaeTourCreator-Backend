import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const isPasswordSafe  = require('./password.strenght');

@Injectable()
export class PasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    if (!isPasswordSafe(password)) {
      return res.status(400).json({ message: 'Password is not secure' });
    }
    next();
  }
  
}


