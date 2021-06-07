import { Router } from 'express';

import { CategoriesRepository } from '../repositories/categories-repository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createdCategory = categoriesRepository.create({ name, description });

  return response.status(201).send();
});

export { categoriesRoutes };
