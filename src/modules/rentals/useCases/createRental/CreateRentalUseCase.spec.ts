import dayjs from 'dayjs';

import { InMemoryRentalsRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalsRepository';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';

import { AppError } from '../../../../shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let inMemoryRentalsRepository: InMemoryRentalsRepository;
let dateProvider: DayJsDateProvider;
let expect_return_date: Date;

describe('Create Rental', () => {
  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    dateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalsRepository, dateProvider);
    expect_return_date = dayjs(new Date()).add(1, 'day').toDate();
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: expect_return_date,
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be possible an user rent two or more cars simultaneously', async () => {
    await createRentalUseCase.execute({
      user_id: 'vvg123',
      car_id: 'abcdefg',
      expected_return_date: expect_return_date,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'vvg123',
        car_id: 'fffghf',
        expected_return_date: expect_return_date,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to rent a car already rented', async () => {
    await createRentalUseCase.execute({
      user_id: 'abcde',
      car_id: 'jj1428',
      expected_return_date: expect_return_date,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'abcdedf',
        car_id: 'jj1428',
        expected_return_date: expect_return_date,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to rent a car by less than 24 hours', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'abcdedf',
        car_id: 'jj1428',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
