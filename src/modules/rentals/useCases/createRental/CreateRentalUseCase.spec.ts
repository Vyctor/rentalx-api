import { InMemoryRentalsRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalsRepository';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let inMemoryRentalsRepository: InMemoryRentalsRepository;

describe('Create Rental', () => {
  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalsRepository);
  });

  it('should be able to create a new rental', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: new Date(),
    });
  });

  // it('should be not possible to create a rent less than 24 hours', () => {});
  // it('should not be able to rent a car already rented', () => {});
});
