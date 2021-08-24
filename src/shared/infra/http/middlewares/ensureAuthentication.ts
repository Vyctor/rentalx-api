import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth.config';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthentication(request: Request, response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('Token is missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, authConfig.secret_refresh_token) as IPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(userId, token);

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
