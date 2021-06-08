import { Specification } from '../model/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from './ISpecificationRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Array<Specification>;

  constructor() {
    this.specifications = [];
  }

  public create({ name, description }: ICreateSpecificationDTO): void {
    const specification: Specification = new Specification(name, description, new Date());
    this.specifications.push(specification);
  }

  public findByName(name: string): Specification {
    return this.specifications.find((specification) => specification.name === name);
  }
}

export { SpecificationsRepository };
