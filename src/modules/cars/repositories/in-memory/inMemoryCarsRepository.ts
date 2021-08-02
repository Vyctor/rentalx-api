import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class InMemoryCarsRepository implements ICarsRepository {
  cars: Array<Car> = [];

  async create({ brand, category_id, daily_rate, description, fine_amount, name, license_plate }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Array<Car>> {
    return this.cars.filter((car) => {
      if (brand) {
        return car.brand === brand;
      }

      if (category_id) {
        return car.category_id === category_id;
      }

      if (name) {
        return car.name === name;
      }

      return null;
    });
  }
}

export { InMemoryCarsRepository };
