import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAuthentication(request: Request, response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;
  interface IPayload {
    sub: string;
  }

  if (!authHeader) {
    throw new AppError('Token is missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, 'b72360591d4c47d6625d8bd036cc5814') as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User doesnt exists!', 401);
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
