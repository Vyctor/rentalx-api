import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token is missing!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, 'b72360591d4c47d6625d8bd036cc5814');
    console.log(decoded);
  } catch {
    throw new Error('Invalid token!');
  }
}
