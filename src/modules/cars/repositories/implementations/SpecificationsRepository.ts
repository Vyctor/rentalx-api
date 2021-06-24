import { Repository, getRepository } from 'typeorm';

import { Specification } from '../../entities/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from '../ISpecificationRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private readonly repository: Repository<Specification>;
  constructor() {
    this.repository = getRepository(Specification);
  }

  public async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });
    await this.repository.save(specification);
  }

  public async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }
}

export { SpecificationsRepository };
