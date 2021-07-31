import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/inMemoryCarsRepository';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: InMemoryCarsRepository;

describe('CreateCar', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1235',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category',
    });
  });
});
