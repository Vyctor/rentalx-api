import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create Category Controller', () => {
  it('should be able create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Sedan',
      description: 'A Fancy nice ride',
    });

    expect(response.status).toBe(201);
  });
});
