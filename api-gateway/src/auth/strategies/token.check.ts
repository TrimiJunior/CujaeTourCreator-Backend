import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { invalidTokens } from 'src/common/constants';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token && invalidTokens.has(token)) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Token válido
    next();
  }
}
