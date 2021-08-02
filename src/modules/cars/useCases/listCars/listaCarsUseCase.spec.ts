import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/inMemoryCarsRepository';

import { ListCarsUseCase } from './listaCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe('List Cars', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listCarsUseCase = new ListCarsUseCase(inMemoryCarsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car1 = await inMemoryCarsRepository.create({
      name: 'Audi A4',
      description: 'A Fancy car',
      daily_rate: 120,
      license_plate: 'ABCD-1234',
      fine_amount: 40,
      brand: 'Audi',
      category_id: 'b39827a5-2ba8-4d09-aec0-b1cd2b13cf89',
    });

    const car2 = await inMemoryCarsRepository.create({
      name: 'Audi A8',
      description: 'A Fancy car',
      daily_rate: 200,
      license_plate: 'ABCD-1134',
      fine_amount: 400,
      brand: 'Audi',
      category_id: 'b39827a5-2ba8-4d09-aec0-b1cd2b13cf89',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Audi',
    });
    expect(cars).toEqual([car1, car2]);
  });

  it('shuld be able to list all available cars by name', async () => {
    const car2 = await inMemoryCarsRepository.create({
      name: 'Ferrari Spyder',
      description: 'A Fancy car',
      daily_rate: 600,
      license_plate: 'ABCF-1934',
      fine_amount: 1000,
      brand: 'Ferrari',
      category_id: 'b39827a5-2ba8-4d09-aec0-b1cd2b13cf89',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Ferrari',
    });

    expect(cars).toEqual([car2]);
  });
});
