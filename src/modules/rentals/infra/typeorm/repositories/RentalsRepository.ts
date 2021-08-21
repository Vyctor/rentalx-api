import { Repository, getRepository } from 'typeorm';

import { ICretateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findById(car_id: string): Promise<Rental> {
    return this.repository.findOne({ car_id });
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { car_id, end_date: null },
    });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { user_id, end_date: null },
    });
  }

  async create({ car_id, expected_return_date, user_id, id, end_date, total }: ICretateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      expected_return_date,
      car_id,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
