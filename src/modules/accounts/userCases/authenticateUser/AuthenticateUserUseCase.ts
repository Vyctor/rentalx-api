import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: UsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usuário existe?
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail or password incorrect!');
    }

    // Senha está correta?
    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log('password match: ', passwordMatch);

    if (!passwordMatch) {
      throw new AppError('E-mail or password incorrect!');
    }

    // Gerar JWT
    const token = sign({}, 'b72360591d4c47d6625d8bd036cc5814', {
      subject: user.id,
      expiresIn: '1d',
    });

    // Retornar resposta

    const response: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return response;
  }
}

export { AuthenticateUserUseCase };
