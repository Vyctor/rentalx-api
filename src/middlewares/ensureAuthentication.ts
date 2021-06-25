import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

export async function ensureAuthentication(request: Request, response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;
  interface IPayload {
    sub: string;
  }

  if (!authHeader) {
    throw new Error('Token is missing!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, 'b72360591d4c47d6625d8bd036cc5814') as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new Error('User doesnt exists!');
    }

    next();
  } catch {
    throw new Error('Invalid token!');
  }
}
