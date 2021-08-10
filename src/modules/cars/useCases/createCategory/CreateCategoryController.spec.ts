import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create Category Controller', () => {
  it('should be able to list some shit', async () => {
    await request(app).get('cars/available').expect(200);
  });
});
