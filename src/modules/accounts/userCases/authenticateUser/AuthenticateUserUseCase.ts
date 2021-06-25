import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '../../repositories/implementations/UsersRepository';

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
      throw new Error('E-mail or password incorrect!');
    }

    // Senha está correta?
    const passwordMatch = await compare(user.password, password);

    if (!passwordMatch) {
      throw new Error('E-mail or password incorrect!');
    }

    // Gerar JWT
    const token = sign({}, 'b72360591d4c47d6625d8bd036cc5814', {
      subject: user.id,
      expiresIn: '1d',
    });

    // Retornar resposta
    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
