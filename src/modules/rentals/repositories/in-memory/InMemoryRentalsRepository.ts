import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

class InMemoryRentalsRepository implements IRentalsRepository {
  rentals: Array<Rental> = new Array<Rental>();

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find((rental) => {
      const carIsNotRented = rental.end_date === null;
      const carIsTheSame = rental.car_id === car_id;

      return carIsTheSame && carIsNotRented;
    });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find((rental) => {
      const userHasNoRent = rental.end_date === null;
      const userIsTheSame = rental.user_id === user_id;

      return userIsTheSame && userHasNoRent;
    });
  }
}

export { InMemoryRentalsRepository };
